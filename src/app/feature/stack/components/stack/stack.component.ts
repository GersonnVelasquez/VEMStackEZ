import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthStateService } from 'src/app/core/services/auth-state.service';
import { YardStorageService } from 'src/app/core/storage/yard-storage.service';
import { YardLayout } from '../../shared/models/yard-layout.model';
import { YardLocation, Yard } from '../../shared/models/yard.model';
import { StackService } from '../../shared/services/stack.service';
import { filter, take } from 'rxjs/operators';
import { Instruction } from 'src/app/feature/home/shared/models/instruction.model';
import { MatDialog } from '@angular/material/dialog';
import { ChoosePositionDialogComponent } from '../choose-position-dialog/choose-position-dialog.component';
import { LostUnitDialogComponent } from '../lost-unit-dialog/lost-unit-dialog.component';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarLayout, resetUnitSelected, selccionarUnit } from 'src/app/store/actions';
import { State } from '../../shared/state-class/state.abstract';
import { NormalState } from '../../shared/state-class/normalMode.state';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss']
})
export class StackComponent implements OnInit {
  letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  yardLayout: YardLayout;
  inventory: any[];
  unitSelected: YardLocation | null = null;
  instructionSelected: Instruction | null = null;
  yard: Yard;
  watingForSelectLocation = false;
  creatingWorkInstruction = false;
  private state: State;
  @Input() instancia: string;

  constructor(private store: Store<AppState>, private stackServices: StackService, private auth: AuthStateService, public dialog: MatDialog, private yardStorage: YardStorageService) {
  }

  ngOnInit(): void {

    this.yardStorage.unitSelected$N.subscribe((data) => {
      this.unitSelected = data;
    });

    this.yardStorage.state$N.subscribe(data => {
      this.transitionTo(data);
    })
    this.getYardLayout();
  }

  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    console.log(state)
    this.state.setContext(this);
  }

  get isInstructionSelected() {
    return this.instructionSelected !== null;
  }

  isUnitSelected(unit: YardLocation) {
    if (unit.type === 'Unit') {
      if (unit?.unit?.RecordId === this.unitSelected?.unit?.RecordId) {
        return true;
      }
    }

    return false;
  }

  async getYardLayout() {
    this.store.dispatch(cargarLayout({ recordId: 3 }));
    this.auth.userInfo$.subscribe(async (data) => {
      if (data) {
        this.store.select('yard').subscribe(({ YardLayout }) => {
          if (YardLayout) {
            this.yardLayout = YardLayout; //cambiar id quemado
            this.yard = new Yard(this.yardLayout, this.getUnits);
            this.yard.setInventory();

            this.yard.layout.subscribe(data => {
              this.inventory = data;
            });
          }
        });
      }
    });
  }

  cancelInstructionWaiting() {
    // this.yardStorageService.cancelWatingForSelectLocation$.next({ origen: this.instancia, data: true });
  }



  // async selectUnit(unit: YardLocation) {
  //   if (unit) {
  //     if (!this.watingForSelectLocation) {
  //       await this.selectUnitIfNoWatingForSelectLocation(unit);
  //     } else {
  //       this.selectUnitIfWatingForSelectLocation(unit);
  //     }
  //   }
  // }

  async selectUnitIfNoWatingForSelectLocation(unit: YardLocation) {
    if (!this.unitSelected) {
      this.unitSelected = unit;
      this.store.dispatch(selccionarUnit({ unit: unit }))
    } else {
      if (unit?.type === 'Null') {
        await this.updateUnitLocation(unit)
        this.getUnitsAndSetInventory();
      }
    }
  }

  updateData() {
    // this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Update' });
  }

  async selectUnitIfWatingForSelectLocation(unit: YardLocation) {
    if (unit.type === 'Null' || unit.type === 'Instruction') {
      // this.yardStorageService.unitSelectedForSelectLocation$.next({ origen: this.instancia, data: unit });
    }
  }

  // async updateUnitLocation(unit: YardLocation) {
  //   if (this.creatingWorkInstruction) {
  //     await this.stackServices.createWorkInstruction(this.getUnitWithPositionUdated(unit))
  //   } else {
  //     await this.stackServices.updateUnitLocation(this.getUnitWithPositionUdated(unit))
  //   }
  // }

  getUnitWithPositionUdated(unit: YardLocation) {
    let newUnit = { ...this.unitSelected?.unit };
    newUnit.StackRecordId = unit.stackId;
    newUnit.RowRecordId = unit.rowId;
    newUnit.Depth = unit.depth;
    newUnit.Height = unit.height - 1;
    return newUnit;
  }

  getUnits = async (row: string, yardId: number) => {
    return this.stackServices.getUnits(row, yardId);
  }


  getUnitsAndSetInventory() {
    this.yard.getUnitsAndSetInventory();
  }

  async updateUnitLocation(yardLocation: YardLocation) {
    await this.stackServices.updateUnitLocation(this.getUnitWithPositionUdated(yardLocation));
  }

  selectLocation(yardLocation: YardLocation) {
    this.state.selectLocation(yardLocation);
  }

  setSelectedLocation(yardLocation: YardLocation) {
    this.yardStorage.unitSelected$N.next(yardLocation);
  }

  resetSelectedLocation() {
    this.yardStorage.unitSelected$N.next(null);
  }

  changeState(state: State) {
    this.yardStorage.state$N.next(state);
  }

  cancelOperation() {
    this.state.cancelOperation();
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

  scrollIntoViewElementSelected(RecordId: string) {
    setTimeout(() => {
      document.getElementById(RecordId)?.scrollIntoView(false);
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
        // this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Reset' });
      }
    });
  }

}
