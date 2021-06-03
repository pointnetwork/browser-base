import { WalletService } from '~/main/fork/point/services/wallet/wallet';
import { PointSettings } from './settings/PointSettings';
import { ForkClient } from '../interfaces/client';
import { app, ipcMain, session } from 'electron';
import { apiRequest } from '~/utils/api';
import { WALLET_API } from '~/main/fork/point/constants/api';
import { timeout } from '~/utils/utils';
import { showSimpleNotification } from '~/utils/notifications';
import { WindowsService } from '~/main/windows-service';
import { runPointMessagingService } from '~/main/fork/point/services/messaging';
import { AppWindow } from '~/main/windows';
import { NodeSocketService } from '~/main/fork/point/services/node/nodeSocket';
import { StorageService } from '~/main/fork/point/services/storage/storage';
import { ContractService } from '~/main/fork/point/services/contract/contract';

export class PointClient extends ForkClient {
  static instance = new PointClient();

  public storage = StorageService.instance;
  public contract = ContractService.instance;
  public socket = NodeSocketService.instance;
  public settings = PointSettings.instance; //  instance created so that settings are loaded before the settings are actually required

  public constructor() {
    super();

    ipcMain.on('apply-proxy', () => {
      this.setProxies();
    });
    this.onReady();
    this.heartbeatMonitor();
    // this.emailClient = new PointEmailClient();
    runPointMessagingService();
  }

  public async onReady() {
    await app.whenReady();
    this.socket.wallet.loadSettings();
    this.settings.getSettings().then(() => {
      console.log('got settings>>>>');
      this.setProxies();
    });
  }
  // public applyWindowsProxy(newProxy: string, windowId: number) {
  //   const window = WindowsService.instance.findBrowserWindowById(windowId);
  //   const settings = this.settings.object;
  //   const proxyBypassRules = settings.proxyBypassRules;
  //   session
  //     .fromPartition(`persist:${window.windowId}`)
  //     .setProxy({ proxyRules: newProxy, proxyBypassRules })
  //     .then(() => {
  //       console.log(`proxy applied - persist:${window.windowId}`, {
  //         proxyRules: newProxy,
  //         proxyBypassRules,
  //       });
  //     });
  // }

  public applyWindowProxy(newProxyRules: string, window: AppWindow) {
    const settings = this.settings.object;
    const proxyBypassRules = settings.proxyBypassRules;
    window.proxy = newProxyRules;
    session
      .fromPartition(`persist:${window.windowId}`)
      .setProxy({ proxyRules: newProxyRules, proxyBypassRules })
      .then(() => {
        console.log(`proxy applied - persist:${window.windowId}`, {
          proxyRules: newProxyRules,
          proxyBypassRules,
        });
      });
  }

  public setProxies(newProxyRules: string | void) {
    const settings = this.settings.object;
    const proxyRules = newProxyRules ? newProxyRules : settings.proxyRules;

    AppWindow.globalProxy = proxyRules;
    WindowsService.instance.list.forEach((window) =>
      this.applyWindowProxy(proxyRules, window),
    );
  }

  //  quits app if point node is not connected
  private async heartbeatMonitor() {
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
