import { EventEmitter } from 'events';
import Socket, { Options } from 'reconnecting-websocket';
import { SOCKET_DEFAULT_OPTIONS } from '~/main/fork/point/constants/api';
import { ISocketObj, ISocketSub } from '~/main/fork/point/interfaces/sockets';

export const SOCKET_MESSAGES = {
  STATUS: 'socket_status',
  DEPLOYMENT_PROGRESS: 'request_deployment-progress',
};

export const CLIENT_MESSAGES = {
  STATUS: 'status',
  DEPLOYMENT_PROGRESS: 'data',
  MESSAGE: 'message',
};

export class ConsoleSocketClient extends EventEmitter {
  public socket: Socket;
  public socketSubs: ISocketSub[];

  private reconnectAttempt = 0;
  public constructor(socketUrl: string, options?: Options) {
    super();
    // if (socketUrl === '') this.socket = new EventEmitter();
    this.socket = new Socket(socketUrl, [], {
      ...SOCKET_DEFAULT_OPTIONS,
      ...options,
    });

    this.socket.addEventListener('open', (e) => {
      console.log('[SOCKET] socket connected');
      this.reconnectAttempt = 0;
      this.socket.send('status');
    });
    this.socket.addEventListener('close', (e) => {
      console.log('[SOCKET] socket was disconneted, reconnecting...');
      this.emit(CLIENT_MESSAGES.STATUS, 'Disconnected - attempting reconnect');
    });

    this.socket.addEventListener('message', (msg) => {
      this.processMsg(msg);
    });
  }

  private processMsg(msg: MessageEvent) {
    if (msg.type) {
      try {
        const parsed = JSON.parse(msg.data);
        const type = parsed.type;
        if (!type) this.emit(CLIENT_MESSAGES.MESSAGE, msg.data);
        else
          this.onMessage({
            type,
            status: parsed?.status,
            data: parsed.data,
          });
      } catch {
        this.emit(CLIENT_MESSAGES.MESSAGE, msg.data);
      }
    }
  }

  public socketOn(evName: string, callback: (...args: unknown[]) => void) {
    this.socketSubs.push({ evName, callback });
  }

  //  unsub all socketSubs
  public unsubAll() {
    let subObj = this.socketSubs.pop();
    while (subObj) {
      subObj = this.socketSubs.pop();
    }
  }

  private onMessage(data: ISocketObj) {
    switch (data.type) {
      case SOCKET_MESSAGES.STATUS: {
        this.emit(CLIENT_MESSAGES.STATUS, data);
        break;
      }
      case SOCKET_MESSAGES.DEPLOYMENT_PROGRESS: {
        this.emit(CLIENT_MESSAGES.DEPLOYMENT_PROGRESS, data);
        break;
      }
      default: {
        console.log(`unknown socket message type - ${data?.type}`);
      }
    }
  }
}
