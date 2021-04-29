import { SocketClient } from '~/main/fork/point/classes/SocketClient';
import { EventEmitter } from 'events';
import { EMAIL_WS } from '~/main/fork/point/constants/api';
import { invokeEvent } from '~/utils/scripts';

export class PointEmailClient extends EventEmitter {
  private _socketArr: Record<string, string>[];
  public _emailSocket: SocketClient;

  public constructor() {
    super();
    this._emailSocket = new SocketClient(EMAIL_WS.BASE);
    this._emailSocket.addSocketCb((data) => {
      console.log('socket callback', data);
      // if (data) {
      //   this._socketArr.push(data);
      //   console.log(data);
      // }
    });
  }
}
