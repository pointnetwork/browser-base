import { IPointSettings } from '~/main/fork/point/interfaces/settings';
import { EventEmitter } from 'events';

const POINT_SETTINGS: IPointSettings = {
  proxyRules: 'http://localhost:65501',
  proxyBypassRules: 'http://localhost:4445',

  wallet: {
    address: '',
    walletId: '',
    passcode: '',
  },
};

export class PointSettings extends EventEmitter {
  static instance = new PointSettings();
  public object = POINT_SETTINGS;

  private loaded = false;

  public constructor() {}
}
