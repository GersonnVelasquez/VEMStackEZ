import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActiveUnit, Units } from '../../shared/models/units.model';
import { unit } from '../../shared/models/yard.model';
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
  }

  close(unitNumber: ActiveUnit): void {
    this.dialogRef.close(unitNumber);
  }

}
