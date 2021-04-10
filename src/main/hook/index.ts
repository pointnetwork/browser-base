import { pointHooks } from '~/main/hook/point';
import { FORK_TYPES } from '~/constants/fork';

export type IHookTypes = 'client' | 'settings';
export function forkHook(type: IHookTypes): unknown {
  if (process.env.FORK === FORK_TYPES.POINT) return pointHooks(type);
  return undefined;
}
