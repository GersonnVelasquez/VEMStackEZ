import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Units } from 'src/app/feature/stack/shared/models/units.model';
import { InstructionsService } from '../../shared/services/instructions.service';
import { filter, filters, ListViewFilterDialogComponent } from '../list-view-filter-dialog/list-view-filter-dialog.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  currentFilters: filter;
  activeUnits: Units;

  constructor(public dialog: MatDialog, private instructionService: InstructionsService) { }

  ngOnInit(): void {
    this.getFilteredActiveUnits();
  }

  filter() {
    const dialogRef = this.dialog.open(ListViewFilterDialogComponent);
    dialogRef.afterClosed().subscribe((result: filters) => {
      if (result) {
        this.getFilteredActiveUnits(result.filterString);
        this.currentFilters = result.filters;
      }
    });
  }

  async getFilteredActiveUnits(filters?: string) {
    this.activeUnits = await this.instructionService.getFilteredActiveUnits(filters ? filters : 'UnitNumber=null&CustomerId=-1&YardId=3&UnitStatusId=-1&EquipmentSizeTypeId=-1&EquipmentGradeId=-1');
  }

}
