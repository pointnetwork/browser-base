import { WindowsService } from '~/main/windows-service';
import { IpcRenderer } from 'electron';

//  doesn't work. Throws errors
// export function invokeEventToRenderers(
//   ipcRenderer: IpcRenderer,
//   channelName: string,
//   data: unknown,
// ) {
//   const windowIds = WindowsService.instance.getAllWindowIds();
//   windowIds.forEach((value) => {
//     ipcRenderer.sendTo(value, channelName, data);
//   });
// }
