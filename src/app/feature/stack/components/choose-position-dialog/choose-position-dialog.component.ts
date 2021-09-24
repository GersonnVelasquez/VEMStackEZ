import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-position-dialog',
  templateUrl: './choose-position-dialog.component.html',
  styleUrls: ['./choose-position-dialog.component.scss']
})
export class ChoosePositionDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<ChoosePositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: infoChooseDialog) {

  }

  close(data: string): void {
    let res: res = {
      data: data,
      type: this.data.type
    }
    this.dialogRef.close(res);
  }

}

export interface infoChooseDialog {
  title: string,
  data: string[],
  type: 'ROW' | 'STACK'
}

interface res {
  data: string,
  type: 'ROW' | 'STACK'
}
