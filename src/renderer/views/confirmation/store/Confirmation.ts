import { ipcRenderer } from 'electron';
import { makeObservable, observable } from 'mobx';
import { IConfirmation } from '~/interfaces/confirmation';

export class Confirmation {
  public id = '';
  public confirmationRequest = '';
  public logo = '';
  public requestTarget = '';

  public constructor(obj: IConfirmation) {
    makeObservable(this, {
      id: observable,
      confirmationRequest: observable,
      requestTarget: observable,
      logo: observable,
    });
    this.id = obj.id;
    this.confirmationRequest = obj.confirmationRequest;
    this.requestTarget = obj.requestTarget;
    this.logo = obj.logo;
  }

  public reject = (): void => {
    ipcRenderer.invoke('wallet-rejected-send-funds');
  };

  public confirm = (): void => {
    console.log('send confirmed send funds');
    ipcRenderer.invoke('wallet-confirmed-send-funds');
  };
}