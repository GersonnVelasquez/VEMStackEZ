import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { unit } from 'src/app/feature/stack/shared/models/yard.model';

@Component({
  selector: 'app-instruction-outboud-modal',
  templateUrl: './instruction-outboud-modal.component.html',
  styleUrls: ['./instruction-outboud-modal.component.scss']
})
export class InstructionOutboudModalComponent implements OnInit {
  unit: unit;
  constructor(
    public dialogRef: MatDialogRef<InstructionOutboudModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.unit = data;
  }
  ngOnInit(): void {
    this.unit.unit.UnitNumber
  }

  yesAction(){
    this.dialogRef.close(true);
  }

}
