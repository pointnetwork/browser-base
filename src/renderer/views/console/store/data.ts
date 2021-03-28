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
  content: string | IFileProgress[]; //  content
}

const MAX_LOG_ITEMS = 1000;
export interface IFileProgress {
  filename: string;
  progress: number;
  status: string;
}
interface IProgressObject {
  data: IFileProgress[];
  status?: string;
  type: string;
}
export class DataStore {
  private currentId = 0;

  @observable
  public logQueue: ILogItem[] = [];

  public constructor() {
    makeObservable(this, { logQueue: observable });

    ipcRenderer.on('log-event', (_, content: string) => {
      this.push(content);
    });
    this.push('Logs Hooked');
    const client = new SocketClient('ws://localhost:2469/ws/deploy/progress');
    client.on(CLIENT_MESSAGES.DEPLOYMENT_PROGRESS, (data: IProgressObject) => {
      console.log('progress - ', data);
      this.groupPush(data.data);
    });

    client.on(CLIENT_MESSAGES.STATUS, (data) => {
      console.log('status?', data);
      this.push(data);
    });

    client.on(CLIENT_MESSAGES.MESSAGE, (data) => {
      console.log('message', data);
      this.push(data);
    });
  }

  public push(content: string) {
    this.logQueue.push({
      id: this.currentId++,
      timestamp: Date.now(),
      content,
    });
    this.limitLogQueue();
  }

  public groupPush(items: IFileProgress[]) {
    const content: IFileProgress[] = [];
    const progressing: IFileProgress[] = [];
    items.forEach((v) => {
      if (v.progress === 100) content.push(v);
      else progressing.push(v);
    });
    this.logQueue.push({
      id: this.currentId++,
      timestamp: Date.now(),
      content: [...content, ...progressing],
    });
    this.limitLogQueue();
  }

  private limitLogQueue() {
    if (this.logQueue.length > MAX_LOG_ITEMS) {
      this.logQueue.shift();
    }
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
}
