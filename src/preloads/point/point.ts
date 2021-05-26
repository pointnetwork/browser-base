import { preloadPointWallet } from '~/preloads/point/wallet';
import { preloadPointConsole } from '~/preloads/point/console';
import { preloadPointStorage } from '~/preloads/point/storage';

export const PreloadPoint = {
  wallet: preloadPointWallet,
  console: preloadPointConsole,
  storage: preloadPointStorage,
};
