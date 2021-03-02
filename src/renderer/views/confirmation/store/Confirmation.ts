import { makeObservable, observable } from 'mobx';
import { IConfirmation } from '~/interfaces/confirmation';

export class Confirmation {
  public id = '';
  public confirmationRequest = '';
  public confirmed?: boolean = null;
  public logo = '';
  public requestTarget = '';

  public constructor(obj: IConfirmation) {
    makeObservable(this, {
      id: observable,
      confirmationRequest: observable,
      confirmed: observable,
      requestTarget: observable,
      logo: observable,
    });
    this.id = obj.id;
    this.confirmationRequest = obj.confirmationRequest;
    this.requestTarget = obj.requestTarget;
    this.logo = obj.logo;
  }

  public reject = (): void => {
    this.confirmed = false;
    //  reject logic to rpc
  };

  public confirm = (): void => {
    this.confirmed = true;
    //  confirm logic to rpc
  };
}
