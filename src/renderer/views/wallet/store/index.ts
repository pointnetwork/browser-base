import { observable, computed, makeObservable } from 'mobx';
import { ISettings, ITheme } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { ipcRenderer } from 'electron';

export class Store {
  public settings: ISettings = { ...(window as any).settings };
  public funds: string = '';
  public address: string = '';

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  public constructor() {
    makeObservable(this, {
      funds: observable,
      settings: observable,
      address: observable,
    });

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };
    this.init();
    this.initListeners();
  }

  private async init() {
    const { funds, address } = await ipcRenderer.invoke('wallet-get-data');
    this.funds = funds;
    this.address = address;
  }
  private initListeners() {
    ipcRenderer.on('wallet-update-funds', (e, funds) => {
      this.funds = funds;
    });
  }
}

export default new Store();
