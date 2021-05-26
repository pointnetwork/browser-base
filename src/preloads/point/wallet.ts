import { ipcRenderer } from 'electron';
import { IConfirmation, ITxSend } from '~/interfaces/confirmation';
import {
  IAddressRequestResult,
  IApiError,
  IBalanceRequestResult,
} from '~/interfaces/pointApi';
import { IWalletTx } from '~/interfaces/wallet';

/**
 * @desc requests using a confirmation object to send a transaction
 * @TODO Currently only supports sending tokens, needs to expand
 */
export const preloadPointWallet = {
  sendTransaction(address: string, amount: number) {
    ipcRenderer.invoke('wallet-send-funds', {
      link: '',
      confirmationRequest: 'No Message',
      requestTarget: 'No Target',
      logo: 'No Logo',
      txObj: { address, amount },
      windowId: ipcRenderer.sendSync('get-window-id'),
    });
  },
  sendTransactionVerbose(requestObj: Partial<IConfirmation>) {
    // TODO : data sanitization

    ipcRenderer.invoke('wallet-send-funds', {
      link: requestObj.link ? requestObj.link : '',
      confirmationRequest: requestObj.confirmationRequest
        ? requestObj.confirmationRequest
        : 'No Message',
      requestTarget: requestObj.requestTarget
        ? requestObj.requestTarget
        : 'No Target',
      logo: requestObj.logo ? requestObj.logo : 'No Logo',
      txObj: {
        amount: requestObj.txObj.amount,
        address: requestObj.txObj.address,
      },
      windowId: ipcRenderer.sendSync('get-window-id'), //  dummy value
    } as IConfirmation);
  },

  /** @desc returns the wallet's current balance */
  async getBalance(): Promise<IBalanceRequestResult> {
    try {
      const res = await ipcRenderer.invoke('wallet-get-funds');
      return { token: res };
    } catch (e: unknown) {
      return {
        error: new Error('NotAuthorizedError'),
        errObj: e,
      } as IApiError;
    }
  },

  async getAddress(): Promise<IAddressRequestResult> {
    try {
      const res = await ipcRenderer.invoke('wallet-get-address');
      return res;
    } catch (e: unknown) {
      return {
        error: new Error('NotAuthorizedError'),
        errObj: e,
      } as IApiError;
    }
  },

  /** @desc returns the wallet's current tx history */
  async getWalletHistory(): Promise<unknown> {
    try {
      const res = await ipcRenderer.invoke('wallet-get-history');
      return res as IWalletTx[];
    } catch (e) {
      return {
        error: new Error('failed to retrieve Wallet history'),
        errObj: e,
      } as IApiError;
    }
  },

  /** @desc hooks into ipcMain to retrieve data from a separate source */
  async walletDataHook(cb: (data: unknown) => void): Promise<() => void> {
    const listener = (_, msg: unknown) => {
      cb(msg);
    };
    ipcRenderer.on('external-wallet-message', listener);
    return () => {
      ipcRenderer.off('external-wallet-message', listener);
    };
  },
};
