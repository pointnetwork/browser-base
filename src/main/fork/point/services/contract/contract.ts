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

  private applyIpcRenderers() {
    ipcMain.handle(`external-contract-call`, async (e, host: string, contractName: string, method: string, params: string) => {
      return await this.call(host, contractName, method, params);
    });
  }
}
