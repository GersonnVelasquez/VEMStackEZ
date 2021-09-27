import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-unit-dialog',
  templateUrl: './new-unit-dialog.component.html',
  styleUrls: ['./new-unit-dialog.component.scss']
})
export class NewUnitDialogComponent implements OnInit {
  unitNumber: string;

  constructor(public dialogRef: MatDialogRef<NewUnitDialogComponent>) { }

  ngOnInit(): void {
  }


  setNewUnit(): void {
    this.dialogRef.close(this.unitNumber);
  }

}
