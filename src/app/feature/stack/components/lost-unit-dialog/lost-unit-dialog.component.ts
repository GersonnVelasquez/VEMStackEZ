import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lost-unit-dialog',
  templateUrl: './lost-unit-dialog.component.html',
  styleUrls: ['./lost-unit-dialog.component.scss']
})
export class LostUnitDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LostUnitDialogComponent>) {

  }

  yesAction(): void {
    this.dialogRef.close('YES');
  }

}
