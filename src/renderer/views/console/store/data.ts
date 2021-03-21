import { observable, computed, makeObservable } from 'mobx';
import { ipcRenderer } from 'electron';
import {
  CLIENT_MESSAGES,
  SOCKET_MESSAGES,
  SocketClient,
} from '~/renderer/classes/SocketClient';

export interface ILogItem {
  id: number; //  native counter
  timestamp: number; //  item log time
  content: string | string[]; //  content
}

const MAX_LOG_ITEMS = 1000;
export class DataStore {
  private currentId = 0;

  @observable
  public logQueue: ILogItem[] = [];

  public constructor() {
    makeObservable(this, { logQueue: observable });

    ipcRenderer.on('log-event', (_, content: string | string[]) => {
      this.push(content);
    });
    this.push('Logs Hooked');
  }

  public test() {
    this.push(
      'This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. This is a long log. ',
    );
    this.push('This is a single line log');
    this.groupPush([
      'This is a multi-line log',
      'This is a multi-line log',
      'This is a multi-line log',
    ]);
    const client = new SocketClient('');
    client.on(CLIENT_MESSAGES.DEPLOYMENT_PROGRESS, (data) => {
      console.log('progress?', data);
      this.push(data.data);
    });
    let percent = 0;
    const interval = setInterval(() => {
      client.socket.emit('message', {
        type: SOCKET_MESSAGES.DEPLOYMENT_PROGRESS,
        data: `progress - ${percent}%`,
      });
      percent = percent + 10;
      if (percent > 100) clearInterval(interval);
    }, 1000);
  }

  public push(content: string | string[]) {
    if (typeof content !== 'string') return this.groupPush(content);
    console.log('this this pushed?', content);
    this.logQueue.push({
      id: this.currentId++,
      timestamp: Date.now(),
      content,
    });
    if (this.logQueue.length > MAX_LOG_ITEMS) {
      this.logQueue.shift();
    }
  }

  public groupPush(items: string[]) {
    this.logQueue.push({
      id: this.currentId++,
      timestamp: Date.now(),
      content: items,
    });
    if (this.logQueue.length > MAX_LOG_ITEMS) {
      this.logQueue.shift();
    }
  }
}
