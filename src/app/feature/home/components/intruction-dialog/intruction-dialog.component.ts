import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instruction } from '../../shared/models/instruction.model';

@Component({
  selector: 'app-intruction-dialog',
  templateUrl: './intruction-dialog.component.html',
  styleUrls: ['./intruction-dialog.component.scss']
})
export class IntructionDialogComponent {
  instruction: Instruction;
  instructionNumber: number;
  constructor(
    public dialogRef: MatDialogRef<IntructionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.instruction = data.intruction;
    this.instructionNumber = data.instructionNumber;
  }

  close(result: string): void {
    let res = {
      resultType: result,
      instruction: this.instruction
    }
    this.dialogRef.close(res);
  }

}
