import { Injectable } from '@angular/core';
import { GetResult, Storage } from '@capacitor/storage';

@Injectable()
export class StorageService {

  constructor() { }

  async setItem(name: string, item: any, exp: any = null) {
    await Storage.set({
      key: name,
      value: JSON.stringify({ item: item, expiration: exp ? exp : null })
    });
  }

  async getItem(name: string) {
    const ret: any = await Storage.get({ key: name });

    // let now = new Date();
    // console.log(now.getTime() ,JSON.parse(ret.value)?.expiration)
    // if (now.getTime() > JSON.parse(ret.value)?.expiration) {
    //   await Storage.remove({ key: name });
    //   return null;
    // }

    if (JSON.parse(ret.value)?.item) {
      return JSON.parse(ret.value).item;
    }

    return null;
  }

  async removeItem(name: string) {
    await Storage.remove({ key: name });
  }
}
