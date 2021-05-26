import { EventEmitter } from 'events';
import { apiRequest } from '~/utils/api';
import { STORAGE_API } from '~/main/fork/point/constants/api';

export class StorageService extends EventEmitter {
  static instance = new StorageService();
  public constructor() {
    super();
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
}
