export interface IApiError {
  error: Error;
  errObj: unknown; //  TODO : specify?...
}

export type IBalanceRequestResult = string | IApiError;
