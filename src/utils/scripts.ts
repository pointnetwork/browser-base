import { WindowsService } from '~/main/windows-service';
import { Application } from '~/main/application';

export interface IInvokeException {
  dialog?: string[];
  view?: string[];
}

export function invokeEvent(
  channelName: string,
  data: unknown,
  exceptions?: IInvokeException,
) {
  const windows = WindowsService.instance.list;
  //  send to all windows
  windows.forEach((window) => {
    // console.log('invokeEvent to window', window.id);
    window.win.webContents.send(channelName, data);

    //  send to all views
    window.viewManager.views.forEach((view) => {
      view.webContents.send(channelName, data);
    });
  });
  //  send to all dialog
  try {
    Application.instance.dialogs.persistentDialogs.forEach((dialog) => {
      if (dialog?.browserWindow)
        dialog.browserWindow.webContents.send(channelName, data);
    });
  } catch (e) {
    console.log('failed webcontents send to persistentDialogs', e);
  }
}
