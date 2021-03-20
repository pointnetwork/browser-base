import { observable, computed, makeObservable } from 'mobx';

export interface ILogItem {
  groupId: number; //  which group of logs item is part of.
  id: number; //  native counter
  timestamp: number; //  item log time
  content: string; //  content
}
const MAX_LOG_ITEMS = 1000;
export class DataStore {
  private currentId = 0;
  private currentGroupId = 0;

  @observable
  public logQueue: ILogItem[];

  public constructor() {}

  public push(content: string) {
    this.logQueue.push({
      groupId: this.currentGroupId++,
      id: this.currentId++,
      timestamp: Date.now(),
      content,
    });
    if (this.logQueue.length > MAX_LOG_ITEMS) {
      this.logQueue.shift();
    }
  }

  public groupPush(items: string[]) {
    const groupId = this.currentGroupId++;
    const timestamp = Date.now();
    items.forEach((content) => {
      this.logQueue.push({
        groupId,
        id: this.currentId++,
        timestamp,
        content,
      });
    });
    if (this.logQueue.length > MAX_LOG_ITEMS) {
      this.logQueue = this.logQueue.splice(
        this.logQueue.length - MAX_LOG_ITEMS,
        this.logQueue.length,
      );
    }
  }
}
