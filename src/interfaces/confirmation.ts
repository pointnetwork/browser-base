export interface IConfirmation {
  windowId: number;
  confirmationRequest: string;
  requestTarget: string;
  logo: string;
  link: string;
  txObj: ITxObj;
}

interface ITxSend {
  amount: number;
  address: string;
}

export type ITxObj = ITxSend;

export type IResolve = (bool: boolean) => void;
