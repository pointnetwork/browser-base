import { ipcRenderer } from 'electron';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  public maxHeight = 0;

  public constructor() {
    super();

    makeObservable(this, { maxHeight: observable });
  }
}

export default new Store();
