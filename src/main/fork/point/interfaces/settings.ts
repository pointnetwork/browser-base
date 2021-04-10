export interface IPointSettings {
  proxyRules: string;
  proxyBypassRules: string;
  wallet: IWalletSettings;

  version: number;
}

interface IWalletSettings {
  address: string;
  walletId: string;
  passcode: string;
}
