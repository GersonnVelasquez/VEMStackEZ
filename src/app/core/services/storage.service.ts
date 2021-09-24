import { Injectable } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';

@Injectable()
export class StorageService {

  constructor() { }

  async setItem(name: string, item: any) {
    await Storage.set({
      key: name,
      value: JSON.stringify(item)
    });
  }

  async getItem(name: string) {
    const ret: GetResult = await Storage.get({ key: name });
    if (ret.value) {
      return JSON.parse(ret.value);
    }
    return null;
  }

  async removeItem(name: string) {
    await Storage.remove({ key: name });
  }
}
