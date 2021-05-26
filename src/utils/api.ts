import axios, { AxiosResponse } from 'axios';

export const apiRequest = async (
  apiObj: IApiObject,
  route: string,
  settings?: IApiSettings,
): Promise<AxiosResponse<IResponseData>> => {
  const targetRoute = apiObj.ROUTES[route] as IRouteObject;
  if (targetRoute.type === 'get') {
    try {
      if (settings?.params) {
        const route = targetRoute.route as (...args: unknown[]) => string;
        return await axios.get(`${apiObj.BASE}${route(...settings.params)}`);
      }
      return await axios.get(`${apiObj.BASE}${targetRoute.route}`, {
        headers: settings?.headers,
      });
    } catch (ex) {
      return ex.response;
    }
  } else {
    try {
      return await axios.post(
        `${apiObj.BASE}${targetRoute.route}`,
        settings?.body,
        { headers: settings?.headers },
      );
    } catch (ex) {
      return ex.response;
    }
  }
};

export interface IResponseData {
  status: number;
  data: unknown;
}

export interface IApiSettings {
  readonly headers?: Record<string, unknown>;
  readonly body?: Record<string, unknown>;
  readonly params?: unknown[];
}

export interface IApiObject {
  BASE: string;
  ROUTES: Record<string, IRouteObject>;
}

interface IRouteObject {
  type: 'get' | 'post';
  route: string | ((...args: unknown[]) => string);
}
