import { ipcRenderer } from 'electron';
import { makeObservable, observable } from 'mobx';
import { IConfirmation, ITxObj } from '~/interfaces/confirmation';

export class Confirmation {
  public id = '';
  public confirmationRequest = '';
  public logo = '';
  public requestTarget = '';
  public txObj: ITxObj;

  public constructor(obj: IConfirmation, id: string) {
    this.id = id;
    this.confirmationRequest = obj.confirmationRequest;
    this.requestTarget = obj.requestTarget;
    this.logo = obj.logo;
    this.txObj = obj.txObj;
    makeObservable(this, {
      id: observable,
      confirmationRequest: observable,
      requestTarget: observable,
      logo: observable,
      txObj: observable,
    });
  }

  public reject = (): void => {
    ipcRenderer.invoke('wallet-rejected-send-funds');
  };

  public confirm = (): void => {
    console.log('send confirmed send funds');
    ipcRenderer.invoke('wallet-confirmed-send-funds');
  };

  get() {
    return {
      id: this.id,
      confirmationRequest: this.confirmationRequest,
      logo: this.logo,
      requestTarget: this.requestTarget,
      txObj: this.txObj,
    };
  }
}
