import { ipcRenderer } from 'electron';
import { IConfirmation } from '~/interfaces/confirmation';

export class PreloadPointWallet {
  public constructor() {}

  public sendTransaction(requestObj: Partial<IConfirmation>) {
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
  }
}
