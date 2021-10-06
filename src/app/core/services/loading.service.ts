import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {

  loading: HTMLIonLoadingElement;

  constructor(public loadingController: LoadingController) {
    this.createLoading();
  }

  async createLoading() {
    this.loading = await this.loadingController.create({
      message: "Loading...",
    });
  }

  async presentLoading() {
    if (this.loading) {
      await this.loading.present();
    } else {
      this.presentLoading()
    }
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

}
