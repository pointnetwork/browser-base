import { ipcMain } from 'electron';
import { PointClient } from '~/main/fork/point/PointClient';

export const runPointMessagingService = () => {
  ipcMain.on(`update-window-proxy`, (e, data) => {
    const windowId = data.window as number;
    const newProxy = data.data as string;
    console.log('update window proxy', data);
    PointClient.instance.applyWindowProxies(newProxy, windowId);
  });
};
