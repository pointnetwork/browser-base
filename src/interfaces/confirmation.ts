export interface IConfirmation {
  windowId: number;
  confirmationRequest: string;
  requestTarget: string;
  logo: string;
  link: string;
  txObj: ITxObj;
}

export interface ITxSend {
  amount: number;
  address: string;
}

export type ITxObj = ITxSend;

export type IResolve = (bool: boolean) => void;
