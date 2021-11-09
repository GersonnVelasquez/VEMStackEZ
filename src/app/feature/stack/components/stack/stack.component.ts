import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthStateService } from 'src/app/core/services/auth-state.service';
import { YardStorageService } from 'src/app/core/storage/yard-storage.service';
import { YardLayout } from '../../shared/models/yard-layout.model';
import { unit, Yard } from '../../shared/models/yard.model';
import { StackService } from '../../shared/services/stack.service';
import { filter, take } from 'rxjs/operators';
import { Instruction } from 'src/app/feature/home/shared/models/instruction.model';
import { MatDialog } from '@angular/material/dialog';
import { ChoosePositionDialogComponent } from '../choose-position-dialog/choose-position-dialog.component';
import { LostUnitDialogComponent } from '../lost-unit-dialog/lost-unit-dialog.component';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { NewUnitDialogComponent } from '../new-unit-dialog/new-unit-dialog.component';
import { ActiveUnit, Units } from '../../shared/models/units.model';
import { Options } from 'src/app/feature/home/components/home/home.component';
import { ColorRulesService } from 'src/app/core/services/color-rules.service';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit {
  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  yardLayout: YardLayout;
  inventory: any[];
  unitSelected: unit | null = null;
  instructionSelected: Instruction | null = null;
  yard: Yard;
  watingForSelectLocation = false;
  creatingWorkInstruction = false;
  isWaitingFromListView = false;
  colorsRules: any[] = [];
  colorRuleSelected: any;
  @Input() instancia: string;

  constructor(private colorRulesServices: ColorRulesService, private stackServices: StackService, private auth: AuthStateService, private yardStorageService: YardStorageService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.colorRulesServices.colorRuleSelected$.subscribe(colorRule => {
      if (colorRule) {
        this.colorRuleSelected = colorRule;
        this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Update' });
      }
    });


    this.yardStorageService.isWaitingFromListView$.subscribe(async (data) => {
      this.isWaitingFromListView = data.data;
    });


    this.yardStorageService.isntructionMode$.subscribe(mode => {
      this.creatingWorkInstruction = mode.data;
      if (mode.data) {
        this.resetSelectedUnit()
      }
    });

    this.yardStorageService.instructionSelected$.subscribe(data => {
      if (data.data) {
        this.instructionSelected = data.data;
      } else {
        this.instructionSelected = null;
      }
    })

    this.yardStorageService.watingForSelectLocation$.subscribe(data => {
      this.watingForSelectLocation = data.data;
    });

    this.yardStorageService.updateData$.subscribe(update => {
      if (update.data === 'Reset') {
        this.resetSelectedUnit();
        this.getUnitsAndSetInventory();
      } else if (update.data === 'Update') {

        this.getUnitsAndSetInventory();
      }
    });

    this.yardStorageService.resetUnitSelected$.subscribe(data => {
      if (data.origen !== this.instancia) {
        if (data.data) {
          this.resetSelectedUnit();
        }
      }
    });

    this.yardStorageService.unitSelected$.subscribe(async (unit) => {
      this.unitSelected = unit;
      if (this.isWaitingFromListView && this.unitSelected) {
        await this.yard.setManualRowByRecordId(this.unitSelected.rowId);
        await this.yard.setManualStackByRecordId(this.unitSelected.stackId);
        this.scrollIntoViewElementSelected(this.unitSelected.unit.RecordId)
      }
    });
    this.getYardLayout();
  }

  get isInstructionSelected() {
    return this.instructionSelected !== null;
  }


  selectColorRule(colorRule: any) {
    this.colorRulesServices.selectColorRule(colorRule);
  }

  isUnitSelected(unit: unit) {
    if (unit.type === 'Unit') {
      if (unit?.unit?.RecordId === this.unitSelected?.unit?.RecordId) {
        return true;
      }
    }

    return false;
  }


  async getYardLayout() {
    this.auth.userInfo$.subscribe(async (data) => {
      if (data) {
        this.yardLayout = await this.stackServices.getYardLayout(3); //cambiar id quemado
        this.colorsRules = await this.colorRulesServices.getColorRulesData();
        this.colorRuleSelected = this.colorRulesServices.colorRuleSelected$.getValue() ? this.colorRulesServices.colorRuleSelected$.getValue().RecordId:this.colorsRules[0];
        this.yard = new Yard(this.yardLayout, this.getUnits);
        this.yard.setInventory();

        this.yard.layout.subscribe(data => {
          this.inventory = data;
        });
      }

    });

  }


  cancelInstructionWaiting() {
    this.yardStorageService.cancelWatingForSelectLocation$.next({ origen: this.instancia, data: true });
  }


  scrollIntoViewElementSelected(RecordId: number) {
    setTimeout(() => {
      document.getElementById(RecordId.toString())?.scrollIntoView(false);
    }, 300);
  }


  selectLocation(unit: unit) {
    if (unit.type === 'Unit' || unit.type === 'Null') {
      this.selectUnit(unit);
    }
    if (unit.type === 'Instruction') {
      if (this.watingForSelectLocation) {
        this.selectUnitIfWatingForSelectLocation(unit);
      } else {
        this.yardStorageService.workInstructionSelected$.next({ origen: this.instancia, data: unit.unit.UnitNumber, destino: 'instruction1' });
      }
    }
    if (unit.type === 'Null') {
      if (this.watingForSelectLocation) {
        this.selectUnitIfWatingForSelectLocation(unit);
      } else {
        this.openNewUnitDialog(unit)
      }
    }
  }



  // async selectUnit(unit: unit) {
  //   if (unit) {
  //     if (!this.watingForSelectLocation) {
  //       await this.selectUnitIfNoWatingForSelectLocation(unit);
  //     } else {
  //       this.selectUnitIfWatingForSelectLocation(unit);
  //     }
  //   }

  // }

  async selectUnit(unit: unit) {
    if (!this.unitSelected && unit.type === 'Unit') {
      this.yardStorageService.unitSelected$.next(unit)
    } else {
      if (unit?.type === 'Null') {
        await this.updateUnitLocation(unit)
        this.getUnitsAndSetInventory();
        this.updateDataAndReset();
      }
    }
  }


  updateDataAndReset() {
    this.resetSelectedUnit();
    this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Reset' });
  }

  updateData() {
    this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Update' });
  }
  getUnitsAndSetInventory() {
    this.yard.getUnitsAndSetInventory();
  }

  async selectUnitIfWatingForSelectLocation(unit: unit) {
    this.resetSelectedUnit();
    if (unit.type === 'Null' || unit.type === 'Instruction') {
      this.yardStorageService.unitSelectedForSelectLocation$.next({ origen: this.instancia, data: unit });
    }
  }



  async updateUnitLocation(unit: unit) {
    if (this.unitSelected) {
      if (this.creatingWorkInstruction) {
        await this.stackServices.createWorkInstruction(this.yard.getUnitWithPositionUdated(unit, this.unitSelected));
      } else {
        await this.stackServices.updateUnitLocation(this.yard.getUnitWithPositionUdated(unit, this.unitSelected));
      }
    }
  }

  getUnits = async (row: string, yardId: number) => {
    return this.stackServices.getUnits(row, yardId, this.colorRuleSelected.RecordId);
  }

  resetSelectedUnit(verifyWaitingFromList = false) {
    this.yardStorageService.unitSelected$.next(null);
    if (verifyWaitingFromList) {
      this.verityAndResetDataIfWaintinFromListView();
    }

  }

  verityAndResetDataIfWaintinFromListView() {
    if (this.isWaitingFromListView) {
      this.yardStorageService.isWaitingFromListView$.next({ origen: this.instancia, data: false });

      if (this.yardStorageService.homeTabChange$.getValue().origen === 'listView') {
        this.yardStorageService.homeTabChange$.next({ data: Options.LISTVIEW, origen: this.instancia });
      }

    }
  }



  async nextRow() {

    await this.yard.nextRow();
    this.scrollTo();
  }

  async prevRow() {

    await this.yard.prevRow();
    this.scrollTo();
  }


  nextStack() {
    this.yard.nextStack();
  }

  prevStack() {
    this.yard.prevStack();
  }


  scrollTo() {
    setTimeout(() => {
      document.getElementById('table-' + this.instancia)?.scroll({
        top: 100000,
        left: 0,
        behavior: 'smooth'
      });
    }, 300);

  }


  openDialog(type: 'ROW' | 'STACK') {
    let info = {
      title: type + 'S',
      data: type === 'ROW' ? this.yard.rowsNumbers : this.yard.stacksNumbersInRow,
      type: type
    }
    const dialogRef = this.dialog.open(ChoosePositionDialogComponent, {
      data: info
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.type === 'ROW') {
          this.yard.setManualRow(result.data);
          this.scrollTo();
        } else if (result.type === 'STACK') {
          this.yard.setManualStack(result.data);
          this.scrollTo();
        }
      }
    });
  }

  lostUnit() {
    const dialogRef = this.dialog.open(LostUnitDialogComponent);
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result === 'YES') {
        await this.stackServices.notifyLostUnit(this.unitSelected?.unit.RecordId, 3) //cambiar yard quemado
        this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Reset' });
      }
    });
  }


  openSearchDialog() {
    const dialogRef = this.dialog.open(SearchDialogComponent);
    dialogRef.afterClosed().subscribe(async (result: ActiveUnit) => {
      if (result) {
        await this.yard.setManualRowByRecordId(result.RowRecordId);
        await this.yard.setManualStackByRecordId(result.StackRecordId);
        let unitSearched: unit = {
          depth: result.Depth,
          height: result.Height - 1,
          rowId: result.RowRecordId,
          stackId: result.StackRecordId,
          type: 'Unit',
          unit: result
        }
        this.yardStorageService.unitSelected$.next(unitSearched);
        this.scrollIntoViewElementSelected(result.RecordId)
      }
    });
  }

  openNewUnitDialog(unit: unit) {
    if (!this.unitSelected) {
      const dialogRef = this.dialog.open(NewUnitDialogComponent);
      dialogRef.afterClosed().subscribe(async (result: string) => {
        if (result) {
          let newUnit = {
            RowRecordId: unit.rowId,
            StackRecordId: unit.stackId,
            Depth: unit.depth,
            Height: unit.height - 1,
            UnitNumber: result,
            RecordId: 0
          }
          await this.stackServices.updateUnitLocation(newUnit);
          this.updateData();
        }
      });
    }
  }

}
