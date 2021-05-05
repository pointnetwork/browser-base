import { ipcMain } from 'electron';
import { PointClient } from '~/main/fork/point/PointClient';
import { WindowsService } from '~/main/windows-service';

export const runPointMessagingService = () => {
  ipcMain.on(`update-window-proxy`, (e, data) => {
    const window = WindowsService.instance.findBrowserWindowById(data.window);
    const newProxy = data.data as string;
    console.log('update window proxy', data);
    PointClient.instance.applyWindowProxy(newProxy, window);
  });
};
