import { observable, computed, makeObservable } from 'mobx';
import { ISettings, ITheme } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { ipcRenderer } from 'electron';

export class Store {
  public settings: ISettings = { ...(window as any).settings };
  public funds = '';
  public address = '';
  public txHashArr: string[] = [];

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  @computed
  public get txArr() {
    return this.txHashArr;
  }

  public constructor() {
    makeObservable(this, {
      funds: observable,
      settings: observable,
      address: observable,
      txHashArr: observable,
    });

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };
    this.init();
    this.initListeners();
  }

  private async init() {
    const { funds, address, txHashArr } = await ipcRenderer.invoke(
      'wallet-get-data',
    );
    this.funds = funds;
    this.address = address;
    this.txHashArr = txHashArr;
  }
  private initListeners() {
    ipcRenderer.on('wallet-update-funds', (e, funds) => {
      this.funds = funds;
    });
    ipcRenderer.on('wallet-update-txHashArr', (e, hash) => {
      console.log('txhashArr update', hash);
      this.txHashArr.push(hash);
    });
  }
}

export default new Store();
