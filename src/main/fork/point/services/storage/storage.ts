import { EventEmitter } from 'events';
import { apiRequest } from '~/utils/api';
import { STORAGE_API } from '~/main/fork/point/constants/api';
import { ipcMain } from 'electron';

export class StorageService extends EventEmitter {
  static instance = new StorageService();
  public constructor() {
    super();
    this.applyIpcRenderers();
  }

  public async getStorageFileById(id: string): Promise<unknown> {
    const { data } = await apiRequest(STORAGE_API, 'GET_FILE_BY_ID', {
      params: [id],
    });
    if (data?.status === 200) {
      return data.data;
    } else {
      throw new Error(`getStorageFileFail - ${id}`);
    }
  }

  private applyIpcRenderers() {
    ipcMain.handle('external-storage-get-file-by-id', async (e, id: string) => {
      return await this.getStorageFileById(id);
    });
  }
}
