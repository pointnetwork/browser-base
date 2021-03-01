import { BrowserWindow } from 'electron';
import { Application } from '../application';
import {
  TOOLBAR_HEIGHT,
  POINT_TOOLBAR_HEIGHT,
  DEFAULT_TAB_HEIGHT,
} from '~/constants/design';

// TODO : make it move according to resize
const SIZE_MULT = 1;
export const showConfirmationDialog = (browserWindow: BrowserWindow) => {
  let height = 0;

  const dialog = Application.instance.dialogs.show({
    name: 'confirmation',
    browserWindow,
    getBounds: () => {
      const winBounds = browserWindow.getContentBounds();
      const height =
        winBounds.height -
        (TOOLBAR_HEIGHT + POINT_TOOLBAR_HEIGHT + DEFAULT_TAB_HEIGHT);
      const center = { x: winBounds.width / 2, y: height / 2 };

      const halfWidth = winBounds.width / 2;
      const halfHeight = height / 2;

      dialog.browserView.webContents.send(`max-height`, 400);
      dialog.browserView.webContents.openDevTools({ mode: 'detach' });
      return {
        x: center.x - halfWidth / SIZE_MULT,
        y:
          TOOLBAR_HEIGHT +
          POINT_TOOLBAR_HEIGHT +
          DEFAULT_TAB_HEIGHT +
          center.y -
          halfHeight / SIZE_MULT,
        width: (halfWidth * 2) / SIZE_MULT,
        height: (halfHeight * 2) / SIZE_MULT,
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
