import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';
import { Confirmation } from '~/renderer/views/confirmation/store/Confirmation';
import { ICON_NO_PROFILE } from '~/renderer/constants';

const defaultConfirmation = new Confirmation({
  id: 'test',
  confirmationRequest: 'A test confirmation requesting a test',
  logo: ICON_NO_PROFILE,
  requestTarget: 'Tester',
});

export class Store extends DialogStore {
  public maxHeight = 0;
  public confirmationQueue: Confirmation[] = [];

  public constructor() {
    super();

    makeObservable(this, {
      maxHeight: observable,
      confirmationQueue: observable,
    });
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
}

export default new Store();
