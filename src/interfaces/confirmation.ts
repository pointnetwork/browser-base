export interface IConfirmation {
  windowId: number;
  confirmationRequest: string;
  requestTarget: string;
  logo: string;
}

export type IResolve = (bool: boolean) => void;
