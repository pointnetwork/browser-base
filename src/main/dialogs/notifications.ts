import { BrowserWindow } from 'electron';
import { Application } from '../application';
import {
  DIALOG_MARGIN_TOP,
  DIALOG_MARGIN,
  DIALOG_TOP,
} from '~/constants/design';

export const showNotificationsDialog = (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
) => {
  let height = 0;

  const dialog = Application.instance.dialogs.show({
    name: 'notifications',
    browserWindow,
    hideOnLoseFocus: true,
    getBounds: () => {
      const winBounds = browserWindow.getContentBounds();
      const maxHeight = winBounds.height - DIALOG_TOP - 16;

      height = winBounds.height - (y - DIALOG_MARGIN_TOP);
      dialog.browserView.webContents.send(
        `max-height`,
        Math.min(maxHeight, height),
      );
      return {
        x: x - 350,
        y: y - DIALOG_MARGIN_TOP,
        width: 350,
        height,
      };
    },
    onWindowBoundsUpdate: () => dialog.hide(),
  });

  if (!dialog) return;

  dialog.on('height', (e, h) => {
    height = h;
    dialog.rearrange();
  });
};
