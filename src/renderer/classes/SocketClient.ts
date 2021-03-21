import { io, Socket, SocketOptions } from 'socket.io-client';
import { EventEmitter } from 'events';

const SOCKET = {
  WAIT: {
    RECONNECT: 500,
  },
  LIMITS: {
    RECONNECT: 10,
  },
};

export const SOCKET_MESSAGES = {
  STATUS: 'socket_status',
  DEPLOYMENT_PROGRESS: 'request_deployment-progress',
};

export const CLIENT_MESSAGES = {
  STATUS: 'status',
  DEPLOYMENT_PROGRESS: 'data',
};

interface socketObj {
  type: string;
  status?: string;
  data?: unknown[];
}

interface socketSub {
  evName: string;
  callback: (...args: unknown[]) => void;
}

export class SocketClient extends EventEmitter {
  public socket: Socket | EventEmitter;
  public socketSubs: socketSub[];

  private reconnectAttempt = 0;
  public constructor(socketUrl: string, options?: SocketOptions) {
    super();
    if (socketUrl === '') this.socket = new EventEmitter();
    else this.socket = io(socketUrl, options);

    this.socket.on('open', () => {
      this.reconnectAttempt = 0;
      this.socket.send('status');
    });

    this.socket.on('message', (data: socketObj) => {
      console.log(data);
      this.onMessage(data);
    });

    //  stuff for socket io
    this.socket.on('connect_error', () => {
      //  try reconnect
      if (this.reconnectAttempt++ < SOCKET.WAIT.RECONNECT) {
        setTimeout(() => this.socket.connect(), SOCKET.WAIT.RECONNECT);
      } else {
        console.error('[SOCKET] reconnect fail');
      }
    });
    this.socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket.connect();
      }
      console.log('[SOCKET] socket was disconneted, reconnecting...');
    });
  }

  public socketOn(evName: string, callback: (...args: unknown[]) => void) {
    this.socket.on(evName, callback);
    this.socketSubs.push({ evName, callback });
  }

  //  unsub all socketSubs
  public unsubAll() {
    let subObj = this.socketSubs.pop();
    while (subObj) {
      this.socket.off(subObj.evName, subObj.callback);
      subObj = this.socketSubs.pop();
    }
  }

  private onMessage(data: socketObj) {
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
