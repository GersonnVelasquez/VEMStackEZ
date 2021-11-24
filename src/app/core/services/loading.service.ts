import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingController } from '@ionic/angular';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable()
export class LoadingService {

  private _isOpen = false;
  private _dialogRef: MatDialogRef<unknown, any>;
  constructor(public dialog: MatDialog) {

  }

  presentLoading() {
    if (!this._isOpen) {
      this._dialogRef = this.dialog.open(LoadingComponent, {
        height: '15rem',
        width: '15rem',
        disableClose: true
      });
      this._isOpen = true;
    }

  }

  dismissLoading() {
    if (this._isOpen) {
      this._dialogRef.close();
      this._isOpen = false;
    }
  }

}
