import { ipcMain, IpcMainInvokeEvent } from 'electron';

import { EventEmitter } from 'events';
import { IConfirmation, ITxObj } from '~/interfaces/confirmation';
import {
  IWalletError,
  IWalletErrorTypes,
  IWalletEvents,
} from '~/interfaces/wallet';
import { ITxReceive, ITxSend } from '~/interfaces/tx';
import { add, fixed, gt, minus } from '~/utils/Big';
import { WalletHistory } from '~/main/fork/point/services/wallet/wallet-history';
import { Application } from '~/main/application';
import { invokeEvent } from '~/utils/scripts';
import { WALLET_API, WALLET_WS } from '~/main/fork/point/constants/api';
import { Settings } from '~/main/models/settings';
import {
  IPointSettings,
  IWalletSettings,
} from '~/main/fork/point/interfaces/settings';
import { apiRequest } from '~/utils/api';
import { showSimpleNotification } from '~/utils/notifications';
import { SocketClient } from '~/main/fork/point/classes/SocketClient';
import { getWebUIURL } from '~/common/webui';

export class WalletService extends EventEmitter {
  public address = '';
  public hash = '';
  public funds = '0';
  public requestQueue: ITxObj[] = [];
  public walletSettings: IWalletSettings;

  public walletHistory: WalletHistory;
  private loaded = false;
  private _walletSocket: SocketClient;
  private _txArr: ITxData[] = [];

  public constructor() {
    super();

    this.on(IWalletEvents.RECEIVED_FUNDS, (_, obj: ITxReceive) => {
      // TODO
      //  invoke notification that funds were received
      this.walletHistory.receiveTx(obj);
      this.funds = add(this.funds, obj.amount);
    });
    this.applyIpcHandlers();
    this.applyEventHandlers();
  }

  public loadSettings() {
    Settings.instance.getSettings().then((settings) => {
      const pointSettings = settings.extendedSettings as IPointSettings;
      this.walletSettings = pointSettings.wallet;
      if (
        this.walletSettings.walletId === '' ||
        this.walletSettings.passcode === ''
      ) {
        this.initWallet().then(() => {
          this.loadPublicAddress();
          this.loadAccountHash();
        });
      } else {
        //  wallet is loaded
        console.log('wallet was loaded ');
        this.loaded = true;
        //  check whether wallet exists in node
        this.loadPublicAddress();
        this.once('load', () => {
          this.loadAccountHash();
        });
      }
    });
  }

  public async loadPublicAddress(): Promise<void> {
    if (!this.loaded) return;
    console.log('request public address');
    const { data } = await apiRequest(WALLET_API, 'PUBLIC_KEY', {
      headers: this.headers,
    });
    console.log('public address res >>', data);
    if (data?.status === 200) {
      const resData = data.data as Record<string, string>;
      this.address = resData?.publicKey;
      this.initWalletSocketClient();
      this.getAccountFunds();
      this.emit('load');
    } else {
      //  wallet does not exist on node, reinit wallet
      // TODO : need to save original wallet data somewhere before overwriting
      console.log('wallet not found - Creating a new wallet');
      showSimpleNotification('Wallet not found', 'Created a new Wallet');
      await this.initWallet();
      await this.loadPublicAddress();
    }
  }

  private async initWallet() {
    const { data } = await apiRequest(WALLET_API, 'GENERATE');
    const walletData = data.data as IWalletSettings;
    this.walletSettings.walletId = walletData.walletId;
    this.walletSettings.passcode = walletData.passcode;
    console.log('New Wallet generated', walletData);
    Settings.instance.updateSettings({
      extendedSettings: { wallet: this.walletSettings },
    });
    this.loaded = true;
  }

  private async loadAddress() {
    if (this.address === '') {
      await this.onAddressLoad();
    }
    return this.address;
  }

  public async loadAccountHash() {
    if (!this.loaded) return;
    const { data } = await apiRequest(WALLET_API, 'HASH', {
      headers: this.headers,
    });
    const resData = data.data as Record<string, string>;
    console.log('load account hash', resData);
    this.hash = resData.hash;
  }

  public async getAccountFunds() {
    await this.loadAddress();
    console.log('request funds');
    const { data } = await apiRequest(WALLET_API, 'BALANCE', {
      headers: this.headers,
    });
    console.log('key', this.walletKey);
    console.log('request funds result', data);
    if (data.status === 200) {
      const fundsData = data.data as Record<string, string>;
      console.log('got funds', fundsData);
      this.funds = fixed(fundsData.balance);
      invokeEvent('wallet-update-funds', this.funds);
    } else {
      showSimpleNotification('Funds', 'failed loading', null, false);
    }
  }

  public async getHash() {
    await this.loadAddress();
    if (this.hash !== '') return this.hash;
    await this.loadAccountHash();
    return this.hash;
  }

  public requestSendFunds(confirmObj: IConfirmation): IWalletError | boolean {
    if (gt(confirmObj.txObj.amount, this.funds))
      return createWalletError(
        IWalletErrorTypes.NOT_ENOUGH_FUNDS,
        'Not enough funds',
      );

    const confirmationDialog = Application.instance.dialogs.getPersistent(
      'confirmation',
    );
    console.log('sent confirmation request ', confirmObj);
    confirmationDialog.send('confirmation-request', confirmObj);

    this.requestQueue.push(confirmObj.txObj);
    return true;
  }

  // public pushTx(hash: string) {
  //   this.txHashArr.push(hash);
  //   invokeEvent('wallet-update-txHashArr', hash);
  // }

  public async sendFunds() {
    if (this.requestQueue.length === 0) return;
    const txObj = this.requestQueue.shift() as ITxObj;

    const { data } = await apiRequest(WALLET_API, 'REQUEST_TX', {
      headers: this.headers,
      body: {
        to: txObj.address,
        value: `${txObj.amount}`,
      },
    });
    if (data.status === 200) {
      // processed by socket
      // const resData = data.data as Record<string, string>;
      // this.pushTx(resData.transactionHash);
    } else {
      showSimpleNotification(`tx send fail`, JSON.stringify(data), null, false);
    }

    this.getAccountFunds();
  }

  private initWalletSocketClient() {
    this._walletSocket = new SocketClient(WALLET_WS.BASE);
    this._walletSocket.addSocketCb((data: ISocketData) => {
      // console.log('socket callback', data);
      if (data?.data) {
        if (typeof data?.data?.status === 'object') {
          console.log('socket status >>>', data.data.status);
          return;
        }
        this._txArr.push(data?.data);
        invokeEvent('wallet-update-txArr', data?.data);
      }
    });
  }

  private applyEventHandlers() {
    this.on('load', () => {
      invokeEvent('wallet-update-address', this.address);
    });
  }

  private applyIpcHandlers() {
    ipcMain.handle(
      'wallet-send-funds',
      async (e: IpcMainInvokeEvent, confirmationObj: IConfirmation) => {
        console.log(confirmationObj);
        // TODO : check which tab sent the request and confirm authenticity
        if (getWebUIURL('wallet') === confirmationObj.link) {
          //  trusted link
        } else {
          //   check the source of the link before carrying on.
        }
        this.requestSendFunds({ ...confirmationObj, windowId: e.frameId });
      },
    );

    ipcMain.handle(
      'wallet-confirmed-send-funds',
      async (e: IpcMainInvokeEvent) => {
        console.log('received confirmed send funds');
        this.sendFunds();
      },
    );

    ipcMain.handle(
      'wallet-rejected-send-funds',
      async (e: IpcMainInvokeEvent) => {
        this.requestQueue.shift();
      },
    );

    ipcMain.handle(`wallet-get-funds`, async () => {
      return this.funds;
    });

    ipcMain.handle(`wallet-get-address`, async () => {
      return this.address;
    });

    ipcMain.handle(`wallet-get-data`, async () => {
      return {
        funds: this.funds,
        address: this.address,
        txArr: this._txArr,
      };
    });

    ipcMain.handle(`wallet-get-confirmation-hash`, async () => {
      const hash = await this.getHash();
      return { hash };
    });
  }

  private onAddressLoad = async (): Promise<void> => {
    return new Promise((resolve) => {
      if (this.address === '') {
        this.once('load', () => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  };

  get walletKey() {
    return `${this.walletSettings.walletId}-${this.walletSettings.passcode}`;
  }

  get headers() {
    return {
      'wallet-token': this.walletKey,
    };
  }
}

interface ISocketData {
  data: ITxData;
}

export interface ITxData {
  transactionHash: string;
  from: string;
  to: string;
  value: string;
}

export const createWalletError = (
  errorType: IWalletErrorTypes,
  message: string,
): IWalletError => {
  return {
    type: errorType,
    message,
  };
};
