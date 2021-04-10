import { WalletService } from '~/main/fork/point/wallet/wallet';
import { PointSettings } from './settings/PointSettings';
import { ForkClient } from '../interfaces/client';
import { app, ipcMain, session } from 'electron';

export class PointClient extends ForkClient {
  static instance = new PointClient();

  public wallet: WalletService;
  public settings = PointSettings.instance; //  instance created so that settings are loaded before the settings are actually required

  public constructor() {
    super();
    this.wallet = WalletService.instance;

    ipcMain.on('apply-proxy', () => {
      this.setProxies();
    });
    this.onReady();
  }

  public async onReady() {
    await app.whenReady();
    console.log('getting settings>>>>');
    this.settings.getSettings().then(() => {
      console.log('got settings>>>>');
      this.setProxies();
    });
  }

  public setProxies(newProxyRules: string | void) {
    const settings = this.settings.object;
    const proxyRules = newProxyRules ? newProxyRules : settings.proxyRules;
    const proxyBypassRules = settings.proxyBypassRules;
    session
      .fromPartition('persist:view')
      .setProxy({ proxyRules, proxyBypassRules })
      .then(() => {
        console.log('proxy applied - webviewsession', {
          proxyRules,
          proxyBypassRules,
        });
      });
    session
      .fromPartition('view_incognito')
      .setProxy({ proxyRules, proxyBypassRules })
      .then(() => {
        console.log('proxy applied - incognito', {
          proxyRules,
          proxyBypassRules,
        });
      });
  }
}
