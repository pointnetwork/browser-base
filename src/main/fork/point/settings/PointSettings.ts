import { IPointSettings } from '~/main/fork/point/interfaces/settings';
import { EventEmitter } from 'events';
import { promises } from 'fs';
import { getPath, makeId } from '~/utils';
import { Application } from '~/main/application';
import { DEFAULT_SEARCH_ENGINES, DEFAULT_SETTINGS } from '~/constants';
import { ISettings } from '~/interfaces';
import { ipcMain, nativeTheme } from 'electron';
import { WEBUI_BASE_URL } from '~/constants/files';
import { runAdblockService, stopAdblockService } from '~/main/services/adblock';
import { PointClient } from '~/main/fork/point/PointClient';
import { POINT_SETTINGS } from '~/main/fork/point/constants/settings';
import { showBlockingOverlay } from '~/main/dialogs/blocking-overlay';
import { ConfirmationDialog } from '~/main/dialogs/confirmation';
import { AppWindow } from '~/main/windows';

const SETTINGS_FILENAME = 'point-settings.json';
export class PointSettings extends EventEmitter {
  static instance = new PointSettings();

  public object = POINT_SETTINGS;
  private queue: string[] = [];

  private loaded = false;

  public constructor() {
    super();
    this.load();
  }

  public async getSettings() {
    if (!this.loaded) {
      await this.onLoad();
    }
    return this.object;
  }

  public pointSaveSettings(settings: Partial<IPointSettings>) {
    this.updateSettings(settings);
  }

  private async load() {
    try {
      const file = await promises.readFile(getPath(SETTINGS_FILENAME), 'utf8');
      let json;
      try {
        json = JSON.parse(file);
        // uncomment the line below if you want settings from the code to persist
        // json = POINT_SETTINGS
      } catch (ex) {
        json = POINT_SETTINGS;
        console.log('Point Settings load fail');
      }
      this.object = {
        ...this.object,
        ...json,
        version: POINT_SETTINGS.version,
      };

      this.loaded = true;

      this.addToQueue();
      this.emit('load');
    } catch (e) {
      console.warn('load failed', e);
      this.loaded = true;
      this.emit('load');
    }

    this.update();
  }

  public update = () => {
    //  update models/settings and make it invoke update
  };

  public async addToQueue() {
    const id = makeId(32);

    this.queue.push(id);

    this.update();

    if (this.queue.length === 1) {
      this.save();
    } else {
      this.once(id, () => {
        this.save();
      });
    }
  }
  private async save() {
    try {
      await promises.writeFile(
        getPath(SETTINGS_FILENAME),
        JSON.stringify({ ...this.object, version: POINT_SETTINGS.version }),
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

  private onLoad = async (): Promise<void> => {
    return new Promise((resolve) => {
      if (!this.loaded) {
        this.once('load', () => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  };

  public updateSettings(settings: Partial<IPointSettings>) {
    if (
      settings?.proxyRules &&
      this.object.proxyRules !== settings.proxyRules
    ) {
      PointClient.instance.setProxies(settings.proxyRules);
    }
    this.object = { ...this.object, ...settings };
    this.addToQueue();
  }

  public applyMessaging(id: number, appWindow: AppWindow) {
    ipcMain.on(`show-confirmation-dialog-${id}`, (e, hideIfOpen: boolean) => {
      //  prevent multiple overlays by any chance
      if (!Application.instance.dialogs.getDynamic(`blocking-overlay`)) {
        // show blocking overlay for every window
        Application.instance.windows.list.forEach((window) => {
          console.log('show blocking overlay - ', window.win.id);
          showBlockingOverlay(window.win, window.win.id);
        });
      }

      const dialog = Application.instance.dialogs.getPersistent(
        'confirmation',
      ) as ConfirmationDialog;
      if (dialog?.visible && hideIfOpen) return dialog.hide();
      dialog.bounds = appWindow.win.getContentBounds();
      dialog.show(appWindow.win);
    });

    ipcMain.on(`hide-confirmation-dialog-${id}`, (e, data) => {
      //  remove blocking overlay for every window
      Application.instance.dialogs.dialogs.forEach((dialog) => {
        if (dialog.name.includes('blocking-overlay')) {
          dialog.hide();
        }
      });

      const dialog = Application.instance.dialogs.getPersistent(
        'confirmation',
      ) as ConfirmationDialog;
      dialog.hide();
    });
  }
}
