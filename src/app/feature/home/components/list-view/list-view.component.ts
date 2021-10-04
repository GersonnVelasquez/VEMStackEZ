import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { YardStorageService } from 'src/app/core/storage/yard-storage.service';
import { ActiveUnit, Units } from 'src/app/feature/stack/shared/models/units.model';
import { unit } from 'src/app/feature/stack/shared/models/yard.model';
import { InstructionsService } from '../../shared/services/instructions.service';
import { Options } from '../home/home.component';
import { filter, filters, ListViewFilterDialogComponent } from '../list-view-filter-dialog/list-view-filter-dialog.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  currentFilters: filter | null;
  activeUnits: Units;

  constructor(public dialog: MatDialog, private instructionService: InstructionsService, private yardStorageService: YardStorageService) { }

  get thereAreUnits(){
    return this.activeUnits?.ActiveUnits?.length <= 0;
  }
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


  selectUnit(unit: ActiveUnit) {
    let newUnit: unit = {
      unit: unit,
      type: 'Unit',
      depth: unit.Depth,
      height: unit.Height,
      stackId: unit.StackRecordId,
      rowId: unit.RowRecordId
    }
    this.yardStorageService.isWaitingFromListView$.next({data:true, origen:'listView'});
    this.yardStorageService.unitSelected$.next(newUnit);
    this.yardStorageService.homeTabChange$.next(Options.INVENTORY)
  }

}
