import axios, { AxiosResponse } from 'axios';

export const apiRequest = async (
  apiObj: IApiObject,
  route: string,
  settings?: IApiSettings,
): Promise<AxiosResponse<IResponseData>> => {
  const targetRoute = apiObj.ROUTES[route] as IRouteObject;
  if (targetRoute.type === 'get') {
    return await axios.get(`${apiObj.BASE}${targetRoute.route}`, {
      headers: settings?.headers,
    });
  } else {
    return await axios.post(
      `${apiObj.BASE}${targetRoute.route}`,
      settings?.body,
      settings?.headers,
    );
  }
};

export interface IResponseData {
  status: number;
  data: unknown;
}

export interface IApiSettings {
  readonly headers?: Record<string, unknown>;
  readonly body?: Record<string, unknown>;
}

export interface IApiObject {
  BASE: string;
  ROUTES: Record<string, IRouteObject>;
}

interface IRouteObject {
  type: 'get' | 'post';
  route: string;
}
