import { BrowserWindow, ipcMain } from 'electron';
import { Application } from '../application';
import {
  TOOLBAR_HEIGHT,
  POINT_TOOLBAR_HEIGHT,
  DEFAULT_TAB_HEIGHT,
  DIALOG_MIN_HEIGHT,
  DIALOG_MARGIN,
  DIALOG_MARGIN_TOP,
} from '~/constants/design';
import { PersistentDialog } from '~/main/dialogs/dialog';
import { IRectangle } from '~/interfaces';

// TODO : make it move according to resize
const SIZE_MULT = 1;

const WIDTH = 300;
const HEIGHT = 400;
const TOP_HEIGHT =
  TOOLBAR_HEIGHT + POINT_TOOLBAR_HEIGHT + DEFAULT_TAB_HEIGHT + 5;
export class ConfirmationDialog extends PersistentDialog {
  public visible = false;
  public browserWindow: BrowserWindow;
  public bounds: IRectangle;

  public constructor() {
    super({
      name: 'confirmation',
      bounds: {
        width: WIDTH,
        height: HEIGHT,
        y: TOP_HEIGHT,
      },
      devtools: false,
    });
  }

  private onResize = () => {
    const winBounds = this.browserWindow.getContentBounds();

    const display = {
      height: winBounds.height - TOP_HEIGHT,
      width: winBounds.width - 20,
    };

    const dims = {
      height: Math.min(HEIGHT, display.height),
      width: Math.min(WIDTH, display.width),
    };

    super.rearrange({
      x: display.width - dims.width,
      y: TOP_HEIGHT,
      width: dims.width,
      height: dims.height,
    });
  };

  public hide(bringToTop = false, hideVisually = true) {
    super.hide(bringToTop, hideVisually);
    this.visible = false;
    if (this.browserWindow) {
      this.browserWindow.removeAllListeners('resize');
      this.browserWindow.removeAllListeners('move');
    }
  }

  public async show(browserWindow: BrowserWindow) {
    super.show(browserWindow, true, false);
    this.browserWindow = browserWindow;
    // this.browserView.webContents.openDevTools({ mode: 'detach' });
    this.visible = true;
    browserWindow.on('resize', this.onResize);

    this.send('visible', true, {
      id: Application.instance.windows.current.viewManager.selectedId,
      ...this.bounds,
    });

    const winBounds = browserWindow.getContentBounds();
    const display = {
      height: winBounds.height - TOP_HEIGHT,
      width: winBounds.width - 20,
    };

    const dims = {
      height: Math.min(HEIGHT, display.height),
      width: Math.min(WIDTH, display.width),
    };

    super.rearrange({
      x: display.width - dims.width,
      y: TOP_HEIGHT,
      width: dims.width,
      height: dims.height,
    });
  }
}
//
// export const showConfirmationDialog = (browserWindow: BrowserWindow) => {
//   let height = 0;
//
//   const dialog = Application.instance.dialogs.show({
//     name: 'confirmation',
//     browserWindow,
//     getBounds: () => {
//       const winBounds = browserWindow.getContentBounds();
//       const display = {
//         height: winBounds.height - TOP_HEIGHT,
//         width: winBounds.width - 20,
//       };
//
//       dialog.browserView.webContents.send(`max-height`, 400);
//       // dialog.browserView.webContents.openDevTools({ mode: 'detach' });
//
//       const dims = {
//         height: Math.min(HEIGHT, display.height),
//         width: Math.min(WIDTH, display.width),
//       };
//
//       return {
//         x: display.width - dims.width,
//         y: TOP_HEIGHT,
//         width: dims.width,
//         height: dims.height,
//       };
//     },
//     onWindowBoundsUpdate: () => dialog.hide(),
//   });
//
//   if (!dialog) return;
//
//   dialog.on('height', (e, h) => {
//     height = h;
//     dialog.rearrange();
//   });
// };
