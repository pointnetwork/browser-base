import { ipcRenderer } from 'electron';

export const preloadPointConsole = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async consoleDataHook(cb: (data: unknown) => void): Promise<() => void> {
    const listener = (_, msg: MessageEvent) => {
      cb(msg);
    };
    ipcRenderer.on('external-console-message', listener);
    return () => {
      ipcRenderer.off('external-console-message', listener);
    };
  },
};
