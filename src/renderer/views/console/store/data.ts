import { observable, computed, makeObservable } from 'mobx';
import { ipcRenderer } from 'electron';
import {
  CLIENT_MESSAGES,
  ConsoleSocketClient,
} from '~/renderer/classes/ConsoleSocketClient';

export interface ILogItem {
  id: number; //  native counter
  timestamp: number; //  item log time
  content: string; //  content
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
  timestamp: number;
}
export class DataStore {
  private currentId = 0;

  @observable
  public logQueue: ILogItem[] = [];
  public progressQueue: IProgressObject[] = [];

  public constructor() {
    makeObservable(this, { logQueue: observable, progressQueue: observable });

    ipcRenderer.on('log-event', (_, content: string) => {
      this.push(content);
    });
    this.push('Logs Hooked');
    const client = new ConsoleSocketClient();
    client.on(CLIENT_MESSAGES.DEPLOYMENT_PROGRESS, (data: IProgressObject) => {
      console.log('progress - ', data);
      this.groupPush(data.data);
    });

    client.on(CLIENT_MESSAGES.STATUS, (data) => {
      console.log('status?');
      if (data === 'Disconnected - attempting reconnect') {
        this.progressQueue.length = 0;
      }
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
    const data: IFileProgress[] = [];
    const progressing: IFileProgress[] = [];
    items.forEach((v) => {
      if (v.progress === 100) data.push(v);
      else progressing.push(v);
    });

    this.progressQueue.push({
      timestamp: Date.now(),
      data: [...data, ...progressing],
    });
  }

  private limitLogQueue() {
    if (this.logQueue.length > MAX_LOG_ITEMS) {
      this.logQueue.shift();
    }
  }
}
