import { IApiObject } from '~/utils/api';

const port =
  typeof process === 'undefined'
    ? window.electronApi.processEnv('WALLET_API_PORT')
    : process.env.WALLET_API_PORT;

export const STORAGE_API: IApiObject = {
  BASE: `http://localhost:${port}`,
  ROUTES: {
    GET_FILE_BY_ID: {
      type: 'get',
      route: (id) => `/api/storage/files/${id}`,
    },
    // TODO : add put & getByIK when available
    // GET_FILES: {
    //   type: 'get',
    //   route: '/api/storage/files',
    // },
  },
};

export const WALLET_API: IApiObject = {
  BASE: `http://localhost:${port}`,
  ROUTES: {
    GENERATE: {
      type: 'get',
      route: '/api/wallet/generate', //  generate a new wallet
    },
    ADDRESS: {
      type: 'get',
      route: '/api/wallet/address',
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
