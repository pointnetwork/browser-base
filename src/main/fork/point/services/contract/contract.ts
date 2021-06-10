import { EventEmitter } from 'events';
import { apiRequest } from '~/utils/api';
import { CONTRACT_API } from '~/main/fork/point/constants/api';
import { ipcMain } from 'electron';

export class ContractService extends EventEmitter {
  static instance = new ContractService();
  public constructor() {
    super();
    this.applyIpcRenderers();
  }

  // TODO: load these headers dynamically via the WalletService e.g.
  // `${this.walletSettings.walletId}-${this.walletSettings.passcode}`;
  get headers() {
    return {
      'wallet-token': 'WALLETID-PASSCODE'
    };
  }

  public async call(host: string, contractName: string, method: string, params: string): Promise<unknown> {
    const { data } = await apiRequest(CONTRACT_API, 'CALL', {
      params: [host, contractName, method, params],
    });
    if (data?.status === 200) {
      return data.data;
    } else {
      throw new Error(`callContractFail`);
    }
  }

  public async send(host: string, contractName: string, method: string, params: string, amountInWei: string): Promise<unknown> {
    const { data } = await apiRequest(CONTRACT_API, 'SEND', {
      headers: this.headers,
      body: {
        host,
        contractName,
        method,
        params,
        amountInWei
      },
    });
    if (data.status === 200) {
      return data.status;
    } else {
      throw new Error(`sendContractFail`);
    }
  }

  private applyIpcRenderers() {
    ipcMain.handle(`external-contract-call`, async (e, host: string, contractName: string, method: string, params: string) => {
      return await this.call(host, contractName, method, params);
    });
    ipcMain.handle(`external-contract-send`, async (e, host: string, contractName: string, method: string, params: string, amountInWei: string) => {
      return await this.send(host, contractName, method, params, amountInWei);
    });
  }
}
