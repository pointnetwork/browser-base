import { ipcRenderer } from 'electron';
import { observable, makeObservable } from 'mobx';
import { IScreenDimensions } from '~/interfaces';

export class Store {
  public screenDims: IScreenDimensions = { width: 0, height: 0 };
  public randomHash = '';
  public constructor() {
    makeObservable(this, { screenDims: observable, randomHash: observable });
    ipcRenderer.send('request-screen-dimensions');
    ipcRenderer.on('screen-dimensions', (_, dims: IScreenDimensions) => {
      console.log('screen dims', dims);
      this.screenDims = dims;
    });
    this.loadHash();
  }

  private async loadHash() {
    const { hash } = await ipcRenderer.invoke('wallet-get-confirmation-hash');
    console.log('hash loaded', hash);
    this.randomHash = hash;
  }
}

export default new Store();
