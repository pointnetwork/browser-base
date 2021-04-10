import { IHookTypes } from '~/main/hook/index';
import { PointClient } from '~/main/fork/point/PointClient';
import { PointSettings } from '~/main/fork/point/settings/PointSettings';

export function pointHooks(type: IHookTypes): unknown {
  if (type === 'client') return new PointClient();
  else if (type === 'settings') return PointSettings.instance;
  throw new Error(`Hook type ${type} not defined yet`);
}
