import { FORK_TYPES } from '~/constants/fork';
import { PointClient } from '~/main/fork/point/PointClient';
import { PointSettings } from '~/main/fork/point/settings/PointSettings';
import { AppWindow } from '~/main/windows';

export type IHookGenerate = 'client' | 'settings' | 'messaging';
export type IHookAction = 'save' | 'load' | '';

export function forkHook(hookType: IHookGenerate): unknown {
  if (process.env.FORK === FORK_TYPES.POINT) {
    if (hookType === 'client') return PointClient.instance;
    else if (hookType === 'settings') return PointSettings.instance;
    else {
      return new Error(`hooktype[${hookType}] does not exist`);
    }
  }
  // pointHooks(type);
  return undefined;
}

export function forkActionHook(
  type: IHookGenerate,
  action: IHookAction,
  ...args: unknown[]
): unknown {
  if (process.env.FORK === FORK_TYPES.POINT) {
    if (type === 'settings') {
      if (action === 'save') {
        PointSettings.instance.pointSaveSettings(args[0]);
      } else if (action === 'load') {
        return PointSettings.instance.object;
      }
    } else if (type === 'client') {
      return;
    } else if (type === 'messaging') {
      if (action === 'load') {
        const id = args[0] as number;
        const appWindow = args[1] as AppWindow;
        PointSettings.instance.applyMessaging(id, appWindow);
      }
    }
  }
}
