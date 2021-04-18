import { EventEmitter } from 'events';
import Socket, { Options } from 'reconnecting-websocket';
import { SOCKET_DEFAULT_OPTIONS } from '~/main/fork/point/constants/api';
import { ISocketSub } from '~/main/fork/point/interfaces/sockets';
import { CLIENT_MESSAGES } from '~/renderer/classes/ConsoleSocketClient';

const defaultOptions = Object.freeze({
  maxReconnectionDelay: 5000,
  minReconnectionDelay: 2000,
  reconnectionDelayGrowFactor: 1.3,
  minUptime: 5000,
  connectionTimeout: 4000,
  maxRetries: Infinity,
  maxEnqueuedMessages: Infinity,
  startClosed: false,
  debug: false,
});

export class WalletSocketClient extends EventEmitter {
  public socket: Socket;
  public socketSubs: ISocketSub;

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
    console.log('processMsg ', msg);
  }
}
