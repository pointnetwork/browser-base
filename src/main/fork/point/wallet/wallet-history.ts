import { ipcMain } from 'electron';
import { EventEmitter } from 'events';
import { ITxReceive, ITxSend } from '~/interfaces/tx';
import { IWalletTx } from '~/interfaces/wallet';

// TODO
//  add logic for pagination when querying for account tx history
//  add invoke event that sends data to each window when live receive / send occurs
export class WalletHistory extends EventEmitter {
  public address: string;

  public liveReceiveArray: ITxReceive[]; //  receive Txs that occurred after app start
  public liveSendArray: ITxSend[]; //  send Txs that occurred after app start
  public txHistory: IWalletTx[]; //  array of txs that can be retrieved from light client

  public constructor(address: string) {
    super();

    this.setAddress(address);
    this.getAccountTxHistory();
    this.applyIpcHandlers();
  }

  private setAddress(address) {
    this.address = address;
    this.getAccountTxHistory();
  }

  public receiveTx(tx: ITxReceive) {
    this.liveReceiveArray.push(tx);
    this.txHistory.push(tx);
  }

  public sendTx(tx: ITxSend) {
    this.liveSendArray.push(tx);
    this.txHistory.push(tx);
  }

  private getAccountTxHistory() {
    // TODO
    //  logic that queries account data and keeps in txHistory
  }

  private applyIpcHandlers() {
    ipcMain.handle(`wallet-get-history`, async () => {
      return this.txHistory;
    });
    ipcMain.handle(`wallet-get-receives`, async () => {
      return this.txHistory;
    });
  }
}
