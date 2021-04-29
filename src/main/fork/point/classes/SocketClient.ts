import { EventEmitter } from 'events';
import { each } from 'lodash';
import { ISocketCallback } from '~/main/fork/point/interfaces/sockets';
import { CLIENT_MESSAGES } from '~/renderer/classes/ConsoleSocketClient';

const WS = require('ws');

export class SocketClient extends EventEmitter {
  public socket = WS;
  public socketCbs: ISocketCallback[] = [];

  private reconnectAttempt = 0;
  public constructor(socketUrl: string) {
    super();
    // if (socketUrl === '') this.socket = new EventEmitter();
    this.connectSockets(socketUrl);

    this.on('msg', (msg: MessageEvent) => {
      each(this.socketCbs, (cb: ISocketCallback) => {
        cb(msg);
      });
    });
  }

  private connectSockets(socketUrl: string) {
    this.socket = new WS(socketUrl);

    this.socket.on('open', () => {
      console.log(`[SOCKET] socket connected - ${socketUrl}`);
      this.reconnectAttempt = 0;
      this.socket.send('status');
    });

    this.socket.on('close', () => {
      setTimeout(() => {
        console.log(
          `[SOCKET] closed - reconnecting in 1 second... [${socketUrl}]`,
        );
        this.reconnectAttempt++;
        this.connectSockets(socketUrl);
      }, 1000);
    });

    this.socket.on('message', (data) => {
      const parsed = JSON.parse(data);
      this.processMsg(parsed);
    });
  }

  public addSocketCb(callback: ISocketCallback) {
    this.socketCbs.push(callback);
  }

  public removeAllSocketCb() {
    let subObj = this.socketCbs.pop();
    while (subObj) {
      subObj = this.socketCbs.pop();
    }
  }

  private processMsg(msg: MessageEvent) {
    this.emit('msg', msg);
  }
}
