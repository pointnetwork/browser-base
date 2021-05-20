export interface ISocketObj {
  type: string;
  status?: string;
  data?: unknown[];
}

export const CONSOLE_CLIENT_MESSAGES = {
  STATUS: 'status',
  DEPLOYMENT_PROGRESS: 'api_deploy',
  MESSAGE: 'message',
};
