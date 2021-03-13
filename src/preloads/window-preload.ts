import { ipcRenderer, contextBridge } from 'electron';
// ipcRenderer methods to allow
console.log('[preload] Exposing ipc methods');
contextBridge.exposeInMainWorld('electronApi', {
  //  TODO : below method is unsafe - fix to enable per channel type
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, data) => {
    ipcRenderer.on(channel, data);
  },
  sendSync: (channel) => {
    ipcRenderer.sendSync(channel);
  },
  invoke: (channel, ...args) => {
    ipcRenderer.invoke(channel, ...args);
  },
});
