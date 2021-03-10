import { ipcRenderer } from 'electron';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';
import { Confirmation } from '~/renderer/views/confirmation/store/Confirmation';
import { ICON_NO_PROFILE } from '~/renderer/constants';
import { IConfirmation } from '~/interfaces/confirmation';

const defaultConfirmation = new Confirmation({
  id: 'test',
  windowId: 1,
  confirmationRequest: 'A test confirmation requesting a test',
  logo: ICON_NO_PROFILE,
  requestTarget: 'Tester',
});

export class Store {
  public windowId: number;
  public maxHeight = 0;
  public confirmationQueue: Confirmation[] = [];

  public constructor() {
    makeObservable(this, {
      maxHeight: observable,
      confirmationQueue: observable,
    });
    this.applyListeners();
  }

  get current() {
    if (this.confirmationQueue.length === 0) return false;
    return this.confirmationQueue[0];
  }

  private closeConfirmationDialogIfEmpty() {
    if (this.confirmationQueue.length !== 0) return;
    ipcRenderer.send(`hide-confirmation-dialog-${this.windowId}`);
  }

  public confirmCurrent() {
    if (!this.current) {
      this.closeConfirmationDialogIfEmpty();
      return;
    }
    console.log('current', this.current);
    this.current.confirm();
    this.confirmationQueue.shift();
    this.closeConfirmationDialogIfEmpty();
  }

  public rejectCurrent() {
    if (!this.current) {
      this.closeConfirmationDialogIfEmpty();
      return;
    }
    this.current.reject();
    this.confirmationQueue.shift();
    this.closeConfirmationDialogIfEmpty();
  }

  public getCurrentConfirmation() {
    if (this.confirmationQueue.length === 0) return defaultConfirmation;
    return this.confirmationQueue[0];
  }
  public rejectAllConfirmations() {
    for (const confirmation of this.confirmationQueue) {
      confirmation.reject();
    }
    this.confirmationQueue = [];
  }
  private applyListeners() {
    ipcRenderer.on(
      'confirmation-request',
      (e, confirmObj: IConfirmation, amount: number) => {
        console.log('received confirmation request', confirmObj);
        this.windowId = confirmObj.windowId;
        this.confirmationQueue.push(new Confirmation(confirmObj));

        ipcRenderer.send(`show-confirmation-dialog-${confirmObj.windowId}`);
      },
    );
  }
}

export default new Store();
