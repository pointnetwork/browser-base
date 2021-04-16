export interface IPointSettings {
  proxyRules: string;
  proxyBypassRules: string;
  wallet: IWalletSettings;

  version: number;
}

export interface IWalletSettings {
  walletId: string;
  passcode: string;
}
