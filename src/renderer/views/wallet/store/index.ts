import { observable, computed, makeObservable } from 'mobx';
import { ISettings, ITheme } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { ipcRenderer } from 'electron';
import { ITxData } from '~/main/fork/point/wallet/wallet';

export class Store {
  public settings: ISettings = { ...(window as any).settings };
  public funds = '';
  public address = '';
  public txArr: ITxData[] = [];

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  public constructor() {
    makeObservable(this, {
      funds: observable,
      settings: observable,
      address: observable,
      txArr: observable,
    });

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };
    this.init();
    this.initListeners();
  }

  private async init() {
    const { funds, address, txArr } = await ipcRenderer.invoke(
      'wallet-get-data',
    );
    this.funds = funds;
    this.address = address;
    this.txArr = txArr;
  }
  private initListeners() {
    ipcRenderer.on('wallet-update-funds', (e, funds) => {
      this.funds = funds;
    });
    ipcRenderer.on('wallet-update-txArr', (e, hash) => {
      console.log('txhashArr update', hash);
      this.txArr.push(hash);
    });
  }
}

export default new Store();
