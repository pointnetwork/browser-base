import { EventEmitter } from 'events';
import { ISocketObj } from '~/main/fork/point/interfaces/sockets';

export const CLIENT_MESSAGES = {
  STATUS: 'status',
  DEPLOYMENT_PROGRESS: 'api_deploy',
  MESSAGE: 'message',
};

export class ConsoleSocketClient extends EventEmitter {
  public constructor() {
    super();
    const removeListener = window.point.console.consoleDataHook(
      (msg: MessageEvent) => {
        this.processMsg(msg);
      },
    );
  }

  private processMsg(msg: MessageEvent) {
    if (msg.type) {
      try {
        const type = msg.type;
        if (!type) this.emit(CLIENT_MESSAGES.MESSAGE, msg.data);
        else
          this.onMessage({
            type,
            status: msg?.status,
            data: msg.data,
          });
      } catch {
        this.emit(CLIENT_MESSAGES.MESSAGE, msg.data);
      }
    }
  }

  private onMessage(data: ISocketObj) {
    switch (data.type) {
      case CLIENT_MESSAGES.STATUS: {
        this.emit(CLIENT_MESSAGES.STATUS, data);
        break;
      }
      case CLIENT_MESSAGES.DEPLOYMENT_PROGRESS: {
        this.emit(CLIENT_MESSAGES.DEPLOYMENT_PROGRESS, data);
        break;
      }
      case CLIENT_MESSAGES.MESSAGE: {
        this.emit(CLIENT_MESSAGES.MESSAGE, data);
        break;
      }
      default: {
        console.log(`unknown socket message type - ${data?.type}`);
      }
    }
  }
}
