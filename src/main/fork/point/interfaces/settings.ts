export interface IPointSettings {
  proxyRules: string;
  proxyBypassRules: string;
  wallet: IWalletSettings;
}

interface IWalletSettings {
  address: string;
  walletId: string;
  passcode: string;
}
