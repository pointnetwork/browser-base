import { observable, computed, makeObservable } from 'mobx';
import { ipcRenderer } from 'electron';

export class WalletStore {
  public funds = '';
  public address = '';

  public constructor() {
    makeObservable(this, {
      funds: observable,
      address: observable,
    });
    this.walletInit();
  }

  private async walletInit() {
    this.funds = await ipcRenderer.invoke('wallet-get-funds');
    this.address = await ipcRenderer.invoke('wallet-get-address');
    ipcRenderer.on('wallet-update-funds', (e, funds) => {
      this.funds = funds;
    });
    ipcRenderer.on('wallet-update-address', (e, address) => {
      this.address = address;
    });
  }
}
