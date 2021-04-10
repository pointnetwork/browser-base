import { IPointSettings } from '~/main/fork/point/interfaces/settings';

export const POINT_SETTINGS: IPointSettings = {
  proxyRules: 'http://localhost:65501',
  proxyBypassRules: 'http://localhost:4445',

  wallet: {
    address: '',
    walletId: '',
    passcode: '',
  },
  version: 1,
};
