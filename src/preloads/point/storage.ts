import { ipcRenderer } from 'electron';

export const preloadPointStorage = {
  async getById(hash: string) {
    return await ipcRenderer.invoke('external-storage-get-file-by-id', hash);
  },
};
