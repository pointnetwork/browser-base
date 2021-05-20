import { PreloadPointWallet } from '~/preloads/point/wallet';
import { PreloadPointConsole } from '~/preloads/point/console';

export const PreloadPoint = {
  wallet: new PreloadPointWallet(),
  console: new PreloadPointConsole(),
};
