import { ipcRenderer } from 'electron';
import { observable, makeObservable } from 'mobx';
import { IScreenDimensions } from '~/interfaces';

export class Store {
  public screenDims: IScreenDimensions = { width: 0, height: 0 };
  public constructor() {
    makeObservable(this, { screenDims: observable });
    ipcRenderer.send('request-screen-dimensions');
    ipcRenderer.on('screen-dimensions', (_, dims: IScreenDimensions) => {
      console.log('screen dims', dims);
      this.screenDims = dims;
    });
  }
}

export default new Store();
