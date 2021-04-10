import { FORK_TYPES } from '~/constants/fork';
import { PointClient } from '~/main/fork/point/PointClient';
import { PointSettings } from '~/main/fork/point/settings/PointSettings';

export type IHookGenerate = 'client' | 'settings';
export type IHookAction = 'save' | 'load' | '';

export function forkHook(hookType: IHookGenerate): unknown {
  if (process.env.FORK === FORK_TYPES.POINT) {
    if (hookType === 'client') return PointClient.instance;
    else if (hookType === 'settings') return PointSettings.instance;
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
    }
  }
}
