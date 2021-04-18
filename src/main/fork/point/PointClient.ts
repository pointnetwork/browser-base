import { WalletService } from '~/main/fork/point/wallet/wallet';
import { PointSettings } from './settings/PointSettings';
import { ForkClient } from '../interfaces/client';
import { app, ipcMain, session } from 'electron';
import { apiRequest } from '~/utils/api';
import { WALLET_API } from '~/main/fork/point/constants/api';
import { timeout } from '~/utils/utils';
import { showSimpleNotification } from '~/utils/notifications';

export class PointClient extends ForkClient {
  static instance = new PointClient();

  public wallet: WalletService;
  public settings = PointSettings.instance; //  instance created so that settings are loaded before the settings are actually required

  public constructor() {
    super();
    this.wallet = new WalletService();
    ipcMain.on('apply-proxy', () => {
      this.setProxies();
    });
    this.onReady();
    this.heartbeatMonitor();
  }

  public async onReady() {
    await app.whenReady();
    this.wallet.loadSettings();
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

  //  quits app if point node is not connected
  // TODO : quit after showing notification
  private async heartbeatMonitor() {
    // console.log('heartbeat check >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const requests = [];
    requests.push(
      new Promise(async (resolve) => {
        try {
          const res = await apiRequest(WALLET_API, 'PING');
          resolve(res);
        } catch (ex) {
          resolve({ ping: false });
        }
      }),
    );
    requests.push(
      new Promise(async (resolve) => {
        const res = await delayedPing();
        resolve(res);
      }),
    );
    let res;
    try {
      res = await Promise.race(requests);
    } catch (ex) {
      shutdown();
      return;
    }

    const typedRes = res as Record<string, Record<string, string>>; //  typescript cheat
    const respData = typedRes?.data;
    if (respData?.ping === 'pong') {
      setTimeout(() => {
        this.heartbeatMonitor();
      }, 7000);
    } else {
      shutdown();
    }
  }
}

function shutdown() {
  console.log('shutting down - not connected to point network');
  showSimpleNotification('Node Error', 'Node is not connected, shutting down');
  setTimeout(() => {
    app.quit();
  }, 2000);
}

async function delayedPing() {
  await timeout(3000);
  return { ping: false };
}
