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

export class WalletService extends EventEmitter {
  static instance = new WalletService();
  public address = '';
  public funds = '0';

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
    this.funds = fixed(100);
    WalletService.invokeEvent('wallet-update-funds', this.funds);
  }

  public async sendFunds(
    confirmObj: IConfirmation,
    amount: number,
  ): Promise<string | IWalletError> {
    if (gt(amount, this.funds))
      return createWalletError(
        IWalletErrorTypes.NOT_ENOUGH_FUNDS,
        'Not enough funds',
      );
    // TODO
    //  invoke the confirmation window and only send funds when confirmed

    this.funds = minus(this.funds, amount);
    WalletService.invokeEvent('wallet-update-funds', this.funds);
    return this.funds;
  }

  private applyIpcHandlers() {
    ipcMain.handle(
      'wallet-send-funds',
      async (
        e: IpcMainInvokeEvent,
        confirmationObj: IConfirmation,
        amount: number,
      ) => {
        console.log('wallet send funds');
        this.sendFunds(confirmationObj, amount);
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
  static invokeEvent(channelName: string, data: unknown) {
    const windows = WindowsService.instance.list;
    //  send to all windows
    windows.forEach((window) => {
      console.log('invokeEvent', window.id);
      window.win.webContents.send(channelName, data);

      //  send to all views
      window.viewManager.views.forEach((view) => {
        view.webContents.send(channelName, data);
      });
    });
    //  send to all dialogs
    Application.instance.dialogs.persistentDialogs.forEach((dialog) => {
      if (dialog?.browserWindow)
        dialog.browserWindow.webContents.send(channelName, data);
    });
    // const windowIds = WindowsService.instance.getAllWindowIds();
    // console.log('invokeEvent', windowIds);
    //
    // windowIds.forEach((value) => {
    //   console.log('invokeEvent id -', value);
    //   ipcRenderer.sendTo(value, channelName, data);
    //   // ipcRenderer.sendTo(value, channelName, data);
    // });
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
