import { WalletService } from '~/main/fork/point/wallet/wallet';
import { PointSettings } from './settings/PointSettings';
import { ForkClient } from '../interfaces/client';

export class PointClient extends ForkClient {
  public wallet = WalletService.instance;
  public settings = PointSettings.instance; //  instance created so that settings are loaded before the settings are actually required

  public constructor() {
    super();
  }
}
