import { observable, computed, makeObservable } from 'mobx';
import { ISettings, ITheme } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { DataStore } from '~/renderer/views/console/store/data';

export class Store {
  @observable
  public settings: ISettings = { ...(window as any).settings };

  public dataStore = new DataStore();

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  public constructor() {
    makeObservable(this, { dataStore: observable });

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };
  }
}

export default new Store();
