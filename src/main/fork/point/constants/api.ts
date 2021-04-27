import { IApiObject } from '~/utils/api';

export const WALLET_API: IApiObject = {
  BASE: `http://localhost:${process.env.WALLET_SOCKET_PORT}`,
  ROUTES: {
    GENERATE: {
      type: 'get',
      route: '/api/wallet/generate', //  generate a new wallet
    },
    PUBLIC_KEY: {
      type: 'get',
      route: '/api/wallet/publicKey',
    }, //  get wallet public key
    BALANCE: {
      type: 'get',
      route: '/api/wallet/balance',
    }, //  get wallet balance
    HASH: {
      type: 'get',
      route: '/api/wallet/hash',
    }, //  get overlay hash
    REQUEST_TX: {
      type: 'post',
      route: '/api/wallet/tx',
    },
    PING: {
      type: 'get',
      route: '/api/ping',
    },
  },
};

export const WALLET_WS = {
  BASE: 'ws://localhost:2468/ws/wallet/connect',
};

export const SOCKET_DEFAULT_OPTIONS = Object.freeze({
  maxReconnectionDelay: 5000,
  minReconnectionDelay: 2000,
  reconnectionDelayGrowFactor: 1.3,
  minUptime: 5000,
  connectionTimeout: 4000,
  maxRetries: Infinity,
  maxEnqueuedMessages: Infinity,
  startClosed: false,
  debug: false,
});
