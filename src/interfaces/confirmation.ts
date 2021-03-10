export interface IConfirmation {
  id: string;
  windowId: number;
  confirmationRequest: string;
  requestTarget: string;
  logo: string;
}

export type IResolve = (bool: boolean) => void;
