import { Component, Input, OnInit } from '@angular/core';
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
  currentFilters: filter | null = null;
  filtersDataFrom: filter | null = null;
  activeUnits: Units;
  orden: {
    columna: string,
    orden: 'asc' | 'desc'
  }
    | null = null;
  @Input() instancia: string;

  constructor(public dialog: MatDialog, private instructionService: InstructionsService, private yardStorageService: YardStorageService) { }

  get thereAreUnits() {
    return this.activeUnits?.ActiveUnits?.length <= 0;
  }
  ngOnInit(): void {
    this.getFilteredActiveUnits();
  }


  setOrden(columna: string) {

    if (this.orden === null) {
      this.orden = {
        orden: 'asc',
        columna: columna
      }
      return;
    }
    if (this.orden.columna === columna && this.orden.orden === 'desc') {
      this.orden = null;
      return;
    }
    if (this.orden?.columna === columna) {
      this.orden = {
        orden: 'desc',
        columna: columna
      }
      return;
    }
    if (this.orden?.columna !== columna) {
      this.orden = {
        orden: 'asc',
        columna: columna
      }
      return;
    }

  }

  filter() {
    const dialogRef = this.dialog.open(ListViewFilterDialogComponent, {
      data: this.filtersDataFrom
    });
    dialogRef.afterClosed().subscribe((result: filters) => {
      if (result) {
        this.getFilteredActiveUnits(result.filterString);
        this.currentFilters = result.filters;
        this.filtersDataFrom = result.filtersForm;
      }
    });
  }

  async getFilteredActiveUnits(filters?: string) {
    this.activeUnits = await this.instructionService.getFilteredActiveUnits(filters ? filters : 'UnitNumber=null&CustomerId=-1&YardId=3&UnitStatusId=-1&EquipmentSizeTypeId=-1&EquipmentGradeId=-1');
    this.activeUnits.ActiveUnits = this.activeUnits.ActiveUnits.map(data => {
      let res = {
        ...data,
        customerName: data.Customer?.Name,
        UnitStatusDescription: data.UnitStatus?.Description,
        EquipmentSizeTypeDescription: data.EquipmentSizeType?.Description,
      }
      return res;
    })
  }

  resetFilters() {
    this.getFilteredActiveUnits();
    this.currentFilters = null;
    this.filtersDataFrom = null;
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
    this.yardStorageService.isWaitingFromListView$.next({ data: true, origen: this.instancia });
    this.yardStorageService.unitSelected$.next(newUnit);
    if (this.instancia === 'listView') {
      this.yardStorageService.homeTabChange$.next({ data: Options.INVENTORY, origen: this.instancia });
    }

  }

}
