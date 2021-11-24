import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-unit-dialog',
  templateUrl: './new-unit-dialog.component.html',
  styleUrls: ['./new-unit-dialog.component.scss']
})
export class NewUnitDialogComponent implements OnInit {
  unitNumber: string = '';
  unitPrefix: string = '';;
  constructor(public dialogRef: MatDialogRef<NewUnitDialogComponent>) { }

  ngOnInit(): void {
  }


  setNewUnit(): void {
    this.dialogRef.close(this.unitPrefix + this.unitNumber);
  }

  validateNumber(){
    this.unitNumber = this.unitNumber.replace(/[^0-9]/g, '');
  }
}
