export interface ISocketObj {
  type: string;
  status?: string;
  data?: unknown[];
}

export interface ISocketSub {
  evName: string;
  callback: (...args: unknown[]) => void;
}

export type ISocketCallback = (...args: unknown[]) => void;
