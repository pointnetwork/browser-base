import { ipcRenderer } from 'electron';

export const preloadPointContract = {
  async call() {
    return await ipcRenderer.invoke('external-contract-call');
  },
};