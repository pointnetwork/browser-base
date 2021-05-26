import { SocketClient } from '~/main/fork/point/classes/SocketClient';
import { EventEmitter } from 'events';
import { CONSOLE_CLIENT_MESSAGES } from '~/main/fork/point/interfaces/sockets';
import { invokeEvent } from '~/utils/scripts';
import { WalletService } from '~/main/fork/point/services/wallet/wallet';

// TODO : fix integration with Wallet
export class NodeSocketService extends EventEmitter {
  static instance = new NodeSocketService();
  private socket: SocketClient;
  public wallet = new WalletService();

  public constructor() {
    super();
    this.socket = new SocketClient(
      `ws://localhost:${process.env.SOCKET_PORT}/ws/node`,
    );

    this.socket.addSocketCb((msg: MessageEvent) => this.processMsg(msg));
  }

  public processMsg(msg: MessageEvent) {
    console.log('processMsg', msg);
    if (
      msg.type === CONSOLE_CLIENT_MESSAGES.DEPLOYMENT_PROGRESS ||
      msg.type === CONSOLE_CLIENT_MESSAGES.MESSAGE ||
      msg.type === CONSOLE_CLIENT_MESSAGES.STATUS
    ) {
      invokeEvent('external-console-message', msg);
      this.emit('socket-console-msg', msg);
      return;
    } else {
      // TODO : define which messages belong to wallet
      invokeEvent('external-wallet-message', msg);
      this.emit('socket-wallet-message', msg);
    }
  }
  public ping() {
    console.log('pong!');
  }
}
