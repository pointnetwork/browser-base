import { ITxReceive, ITxSend } from '~/interfaces/tx';

export interface IWalletError {
  type: IWalletErrorTypes;
  message: string;
}

export enum IWalletErrorTypes {
  WALLET_NOT_LOADED = 'WALLET_NOT_LOADED',
  NOT_ENOUGH_FUNDS = 'NOT_ENOUGH_FUNDS',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_SERVER_ERROR = 'UNKNOWN_SERVER_ERROR',
  UNDEFINED_ERROR = 'UNDEFINED_ERROR',
}

export enum IWalletEvents {
  RECEIVED_FUNDS = 'wallet-funds-received',
  SENT_FUNDS = 'wallet-funds-sent',
}

export type IWalletTx = ITxReceive | ITxSend;
