import { IApiObject } from '~/utils/api';

export const WALLET_API: IApiObject = {
  BASE: 'http://localhost:2468/api/wallet',
  ROUTES: {
    GENERATE: {
      type: 'get',
      route: '/generate', //  generate a new wallet
    },
    PUBLIC_KEY: {
      type: 'get',
      route: '/publicKey',
    }, //  get wallet public key
    BALANCE: {
      type: 'get',
      route: '/balance',
    }, //  get wallet balance
    HASH: {
      type: 'get',
      route: '/hash',
    }, //  get overlay hash
    REQUEST_TX: {
      type: 'post',
      route: '/tx',
    },
  },
};

export const WALLET_WS = {
  BASE: 'http://localhost:2468/ws/wallet/connect',
};
