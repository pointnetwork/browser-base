export interface IApiError {
  error: Error;
  errObj: unknown; //  TODO : specify?...
}

export type IBalanceRequestResult = { token: number } | IApiError;

export type IAddressRequestResult = string | IApiError;
