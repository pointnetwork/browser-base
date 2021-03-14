import { ipcMain, IpcMainInvokeEvent } from 'electron';

import { EventEmitter } from 'events';
import { IConfirmation } from '~/interfaces/confirmation';
import {
  IWalletError,
  IWalletErrorTypes,
  IWalletEvents,
} from '~/interfaces/wallet';
import { ITxReceive, ITxSend } from '~/interfaces/tx';
import { add, fixed, gt, minus } from '~/utils/Big';
import { WalletHistory } from '~/main/services/wallet/wallet-history';
import { WindowsService } from '~/main/windows-service';
import { Application } from '~/main/application';
import { invokeEvent } from '~/utils/scripts';

export class WalletService extends EventEmitter {
  static instance = new WalletService();
  public address = '';
  public funds = '0';
  public requestQueue: number[] = [];

  public walletHistory: WalletHistory;

  public constructor() {
    super();
    this.getAccountFunds();
    // TODO
    //  add listener that listens to the connected light client
    //  and updates funds and emits an event

    this.on(IWalletEvents.RECEIVED_FUNDS, (_, obj: ITxReceive) => {
      // TODO
      //  invoke notification that funds were received
      this.walletHistory.receiveTx(obj);
      this.funds = add(this.funds, obj.amount);
    });
    this.applyIpcHandlers();
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
    this.funds = fixed(500);
    invokeEvent('wallet-update-funds', this.funds);
  }

  public requestSendFunds(
    confirmObj: IConfirmation,
    amount: number,
  ): IWalletError | boolean {
    if (gt(amount, this.funds))
      return createWalletError(
        IWalletErrorTypes.NOT_ENOUGH_FUNDS,
        'Not enough funds',
      );
    // TODO
    //  invoke the confirmation window
    const confirmationDialog = Application.instance.dialogs.getPersistent(
      'confirmation',
    );
    console.log('sent confirmation request');
    confirmationDialog.send('confirmation-request', confirmObj, amount);

    this.requestQueue.push(amount);
    return true;
  }

  public sendFunds() {
    console.log('confirmed send funds');
    if (this.requestQueue.length === 0) return;

    const amount = this.requestQueue.shift();
    this.funds = minus(this.funds, amount);
    invokeEvent('wallet-update-funds', this.funds);
  }

  private applyIpcHandlers() {
    ipcMain.handle(
      'wallet-send-funds',
      async (
        e: IpcMainInvokeEvent,
        confirmationObj: IConfirmation,
        amount: number,
      ) => {
        this.requestSendFunds(
          { ...confirmationObj, windowId: e.frameId },
          amount,
        );
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
      };
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
