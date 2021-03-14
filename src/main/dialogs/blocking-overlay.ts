import { BrowserWindow } from 'electron';
import { Application } from '../application';
import {
  DIALOG_MARGIN_TOP,
  DIALOG_MARGIN,
  DIALOG_TOP,
} from '~/constants/design';
import {iBound} from "~/main/services/dialogs-service";

// TODO
//  make the blocking-overlay follow the screen on screen size change
export const showBlockingOverlay = (browserWindow: BrowserWindow, id: number) => {
  const dialog = Application.instance.dialogs.show({
    name: `blocking-overlay`,
    internalId: id,
    browserWindow,
    getBounds: () => {
      const winBounds = browserWindow.getContentBounds();
      return {
        x: 0,
        y: 0,
        width: winBounds.width,
        height: winBounds.height,
      }
    },
    windowEvents: {
      move: (e) : iBound => {
        const winBounds = browserWindow.getContentBounds();
        return {
          x: 0,
          y: 0,
          width: winBounds.width,
          height: winBounds.height,
        }
      },
      resize: (e) : iBound => {
        const winBounds = browserWindow.getContentBounds();
        console.log(winBounds);
        return {
          x: 0,
          y: 0,
          width: winBounds.width,
          height: winBounds.height,
        }
      }
    }
  };
};
