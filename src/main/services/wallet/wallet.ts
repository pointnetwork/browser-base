import { ipcMain, ipcRenderer } from 'electron';

import EventEmitter from 'node:events';
import { IConfirmation } from '~/interfaces/confirmation';
import {
  IWalletErrorTypes,
  IWalletEvents,
  IWalletTx,
} from '~/interfaces/wallet';
import { ITxReceive, ITxSend } from '~/interfaces/tx';
import { add, fixed, gt, minus } from '~/utils/Big';
import { WalletHistory } from '~/main/services/wallet/wallet-history';
import { WindowsService } from '~/main/windows-service';
import { windowId } from '~/preloads/view-preload';

export class WalletService extends EventEmitter {
  static instance = new WalletService();
  public address = '';
  public funds = '0';

  public walletHistory = new WalletHistory();

  public constructor() {
    super();
    this.funds = this.getAccountFunds();
    // TODO
    //  add listener that listens to the connected light client
    //  and updates funds and emits an event

    this.on(IWalletEvents.RECEIVED_FUNDS, (_, obj: ITxReceive) => {
      // TODO
      //  invoke notification that funds were received
      this.receiveArr.push(obj);
      this.funds = add(this.funds, obj.amount);
    });
    applyIpcHandlers();
  }

  private async loadAddress() {
    // TODO
    //  load address from storage
    this.address = 'test address';
    this.walletHistory = new WalletHistory(this.address);
  }

  public async getAccountFunds() {
    await this.loadAddress();
    // TODO
    //  query wallet address's balance via light client
    this.funds = fixed(100);
  }

  public async sendFunds(
    confirmObj: IConfirmation,
    amount: number,
  ): IWalletError | Promise {
    if (gt(amount, this.funds))
      return createWalletError(
        IWalletErrorTypes.NOT_ENOUGH_FUNDS,
        'Not enough funds',
      );
    // TODO
    //  invoke the confirmation window and only send funds when confirmed

    this.walletHistory.this.funds = minus(this.funds, amount);
    return this.funds;
  }

  private applyIpcHandlers() {
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
      };
    });
  }

  //  sends a result to each window
  static invokeEvent(channelName: string, data: unknown) {
    const windowIds = WindowsService.instance.getAllWindowIds();
    windowIds.forEach((value) => {
      ipcRenderer.sendTo(value, channelName, data);
    });
  }
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
