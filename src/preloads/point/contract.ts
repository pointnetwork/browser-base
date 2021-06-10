import { ipcRenderer } from 'electron';

export const preloadPointContract = {
  async call(host: string, contractName: string, method: string, params: string) {
    return await ipcRenderer.invoke('external-contract-call', host, contractName, method, params);
  },
  async send(host: string, contractName: string, method: string, params: string, amountInWei: string) {
    return await ipcRenderer.invoke('external-contract-send', host, contractName, method, params, amountInWei);
  },
};
