import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActiveUnit, Units } from '../../shared/models/units.model';
import { StackService } from '../../shared/services/stack.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  unitNumber: string;
  activeUnits: ActiveUnit[] = [];
  searched = false;
  constructor(private satckService: StackService, public dialogRef: MatDialogRef<SearchDialogComponent>) { }

  ngOnInit(): void {
  }

  async getUnitsByUnitNumber() {

    this.activeUnits = await this.satckService.getUnitsByUnitNumber(this.unitNumber, 3);
    this.searched = true;
    // console.log(this.activeUnits)
  }

  close(unitNumber: string): void {
    this.dialogRef.close('MNBU3929507');
  }

}
