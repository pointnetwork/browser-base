import { observable, makeObservable } from 'mobx';

export class Store {
  public constructor() {
    makeObservable(this);
  }
}

export default new Store();
