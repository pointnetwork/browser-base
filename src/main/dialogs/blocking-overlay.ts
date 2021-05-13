import { BrowserWindow, ipcMain } from 'electron';
import { Application } from '../application';
import { iBound } from '~/main/services/dialogs-service';

// TODO
//  make the blocking-overlay follow the screen on screen size change
export const showBlockingOverlay = (
  browserWindow: BrowserWindow,
  id: number,
) => {
  const dialog = Application.instance.dialogs.show({
    name: `blocking-overlay`,
    internalId: id,
    browserWindow,
    devtools: false,
    getBounds: () => {
      const winBounds = browserWindow.getContentBounds();
      return {
        x: 0,
        y: 0,
        width: winBounds.width,
        height: winBounds.height,
      };
    },
    windowEvents: {
      move: (e): iBound => {
        const winBounds = browserWindow.getContentBounds();
        return {
          x: 0,
          y: 0,
          width: winBounds.width,
          height: winBounds.height,
        };
      },
      resize: (e): iBound => {
        const winBounds = browserWindow.getContentBounds();
        return {
          x: 0,
          y: 0,
          width: winBounds.width,
          height: winBounds.height,
        };
      },
    },
  });
  ipcMain.once('request-screen-dimensions', () => {
    dialog.browserView.webContents.send(
      'screen-dimensions',
      Application.instance.dialogs.screenDimensions,
    );
  });
};
