import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-list-view-filter-dialog',
  templateUrl: './list-view-filter-dialog.component.html',
  styleUrls: ['./list-view-filter-dialog.component.scss']
})
export class ListViewFilterDialogComponent implements OnInit {
  customers: any[] = [];
  equipmentSizeTypes: any[] = [];
  unitGrades: any[] = [];
  unitsStatus: any[] = [];

  filterForm: FormGroup;
  customer = new FormControl('');
  equipmentSizeType = new FormControl('');
  unitGrade = new FormControl('');
  unitStatus = new FormControl('');
  unitNumber = new FormControl('');
  yardId = new FormControl(3);

  constructor(
    public dialogRef: MatDialogRef<ListViewFilterDialogComponent>, private filterService: FilterService, @Inject(MAT_DIALOG_DATA) public data: filter) {

  }

  async ngOnInit() {


    this.filterForm = new FormGroup({
      customer: this.customer,
      equipmentSizeType: this.equipmentSizeType,
      unitGrade: this.unitGrade,
      unitStatus: this.unitStatus,
      unitNumber: this.unitNumber,
      yardId: this.yardId
    });
    if (this.data) {
      this.filterForm.patchValue(this.data);
    }
    this.customers = await this.filterService.getCustomer();
    this.equipmentSizeTypes = await this.filterService.getEquipmentSizeTypes();
    this.unitGrades = await this.filterService.getUnitGrades();
    this.unitsStatus = await this.filterService.getUnitsStatus();
  }

  setFilters(): void {
    let filters: filters = {
      filterString: this.getFilterString(),
      filters: this.getFilters(),
      filtersForm: this.filterForm.value
    }
    this.dialogRef.close(filters);
  }

  getFilterString() {
    return `UnitNumber=${this.getUnitNumber}&CustomerId=${this.customer.value !== '' ? this.customer.value : -1}&YardId=${this.yardId.value !== '' ? this.yardId.value : -1}&UnitStatusId=${this.unitStatus.value !== '' ? this.unitStatus.value : -1}&EquipmentSizeTypeId=${this.equipmentSizeType.value !== '' ? this.equipmentSizeType.value : -1}&EquipmentGradeId=${this.unitGrade.value !== '' ? this.unitGrade.value : -1}`
  }

  get getUnitNumber() {
    return this.unitNumber.value.length > 0 ? this.unitNumber.value : null
  }


  getFilters() {
    let filter: filter = {
      unitNumber: this.getUnitNumber,
      customer: this.customers.filter(i => i.CustomerId === this.customer.value)[0]?.Name,
      unitGrade: this.unitGrades.filter(i => i.RecordId === this.unitGrade.value)[0]?.Name,
      equipmentSizeType: this.equipmentSizeTypes.filter(i => i.RecordId === this.equipmentSizeType.value)[0]?.Name,
      unitStatus: this.unitsStatus.filter(i => i.RecordId === this.unitStatus.value)[0]?.Name,
      yardId: this.yardId?.value
    }

    if (!filter.unitNumber && !filter.customer && !filter.unitGrade && !filter.equipmentSizeType && !filter.unitStatus) {
      return null
    }
    return filter;
  }

}


export interface filters {
  filterString: string;
  filters: filter | null,
  filtersForm: filter
}

export interface filter {
  unitNumber: string;
  yardId: string;
  customer: string;
  equipmentSizeType: string;
  unitGrade: string;
  unitStatus: string;
}