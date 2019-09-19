import { ipcMain } from 'electron';

import { DEFAULT_SETTINGS } from '~/constants';

import { promises } from 'fs';

import { getPath, makeId } from '~/utils';
import { EventEmitter } from 'events';
import { windowsManager } from '..';
import {
  engine,
  runAdblockService,
  stopAdblockService,
} from '../services/adblock';

export class Settings extends EventEmitter {
  public object = DEFAULT_SETTINGS;

  private queue: string[] = [];

  private loaded = false;

  public constructor() {
    super();

    ipcMain.on(
      'save-settings',
      (e, { settings }: { settings: string; incognito: boolean }) => {
        this.object = { ...this.object, ...JSON.parse(settings) };

        for (const window of windowsManager.list) {
          if (window.webContents.id !== e.sender.id) {
            window.webContents.send('update-settings', this.object);
            window.searchWindow.webContents.send(
              'update-settings',
              this.object,
            );
            window.menuWindow.webContents.send('update-settings', this.object);
          }
        }

        this.update();

        this.addToQueue();
      },
    );

    ipcMain.on('get-settings-sync', e => {
      if (!this.loaded) {
        this.once('load', () => {
          this.update();
          e.returnValue = this.object;
        });
      } else {
        this.update();
        e.returnValue = this.object;
      }
    });

    ipcMain.on('get-settings', e => {
      if (!this.loaded) {
        this.once('load', () => {
          this.update();
          e.sender.send('get-settings', this.object);
        });
      } else {
        this.update();
        e.sender.send('get-settings', this.object);
      }
    });

    this.load();
  }

  private update = () => {
    const contexts = [windowsManager.sessionsManager.extensions];

    contexts.forEach(e => {
      if (e.extensions['wexond-darkreader']) {
        e.extensions['wexond-darkreader'].backgroundPage.webContents.send(
          'api-runtime-sendMessage',
          {
            message: {
              name: 'toggle',
              toggle: this.object.darkContents,
            },
          },
        );
      }

      if (this.object.shield) {
        runAdblockService(e.session);
      } else {
        stopAdblockService(e.session);
      }
    });
  };

  private updateDarkReader = () => {};

  private async load() {
    try {
      const file = await promises.readFile(getPath('settings.json'), 'utf8');
      const json = JSON.parse(file);

      if (!json.version) {
        // Migrate from 3.0.0 to 3.1.0
        json.searchEngines = [];
      }

      if (json.overlayBookmarks !== undefined) {
        delete json.overlayBookmarks;
      }

      if (json.darkTheme !== undefined) {
        delete json.darkTheme;
      }

      this.object = {
        ...this.object,
        ...json,
      };

      this.loaded = true;

      this.save();

      this.emit('load');
    } catch (e) {
      this.loaded = true;
      this.emit('load');
    }
  }

  private async save() {
    try {
      await promises.writeFile(
        getPath('settings.json'),
        JSON.stringify(this.object),
      );

      if (this.queue.length >= 3) {
        for (let i = this.queue.length - 1; i > 0; i--) {
          this.removeAllListeners(this.queue[i]);
          this.queue.splice(i, 1);
        }
      } else {
        this.queue.splice(0, 1);
      }

      if (this.queue[0]) {
        this.emit(this.queue[0]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async addToQueue() {
    const id = makeId(32);

    this.queue.push(id);

    if (this.queue.length === 1) {
      this.save();
    } else {
      this.once(id, () => {
        this.save();
      });
    }
  }
}