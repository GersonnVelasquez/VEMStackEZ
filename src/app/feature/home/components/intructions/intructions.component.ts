import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AuthStateService } from 'src/app/core/services/auth-state.service';
import { unit } from 'src/app/feature/stack/shared/models/yard.model';
import { Instruction } from '../../shared/models/instruction.model';
import { InstructionsService } from '../../shared/services/instructions.service';
import { IntructionDialogComponent } from '../intruction-dialog/intruction-dialog.component';
import { YardStorageService } from 'src/app/core/storage/yard-storage.service';
import { UnitAllocationPayload } from '../../shared/models/unit-allocation-payload.model';
import { ViewDidLeave } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { InstructionOutboudModalComponent } from '../instruction-outboud-modal/instruction-outboud-modal.component';


@Component({
  selector: 'app-intructions',
  templateUrl: './intructions.component.html',
  styleUrls: ['./intructions.component.scss']
})
export class IntructionsComponent implements OnInit, OnDestroy {

  getInstructionsInterval: any;
  instructions: Instruction[] = [];
  isInWorkInstructionMode = false;
  isUnitSelected = false;
  instructionSelected: Instruction;
  search = '';
  @Input() instancia: string;


  constructor(private router: Router, private instructionsServerices: InstructionsService, private auth: AuthStateService, public dialog: MatDialog, private yardStorageService: YardStorageService) { }

  ngOnInit(): void {
    this.yardStorageService.isntructionMode$.subscribe(mode => {
      this.isInWorkInstructionMode = mode.data;
    });

    this.yardStorageService.workInstructionSelected$.subscribe(unitNumber => {
      if (unitNumber.destino === this.instancia) {
        let instruction = this.instructions.filter(i => i.UnitNumber === unitNumber.data);
        if (instruction.length > 0) {
          this.openDialog(instruction[0], this.instructions.indexOf(instruction[0]) + 1)
        }
      }
    });
    this.yardStorageService.cancelWatingForSelectLocation$.subscribe(cancel => {
      if (cancel.data) {
        this.cancelMoveWaiting();
      }
    })
    this.yardStorageService.unitSelected$.subscribe(data => {
      if (data) {
        this.isUnitSelected = true;
      } else {
        this.isUnitSelected = false;
      }
    });

    this.yardStorageService.unitSelectedForSelectLocation$.subscribe(async (unit) => {
      if (unit.data) {
        if (this.instructionSelected.MovementType === 1 &&  unit.data.type === 'Unit') {
          const dialogRef = this.dialog.open(InstructionOutboudModalComponent, {
            data: unit.data
          });
  
          dialogRef.afterClosed().subscribe(async (yesAction) => {
            if (yesAction) {
              this.completeWorkInstructionToDiferentLocation(unit.data, unit.data.type);
            }
          });
          
        } else if(this.instructionSelected.MovementType !== 1) {
          this.completeWorkInstructionToDiferentLocation(unit.data, unit.data.type);
        }

      }
    });


    this.createGetInstructionsInterval();

    this.auth.locationActive$.subscribe(location => {
      if (location) {
        this.instructionsServerices.getInstructions(location.LocationId).subscribe(data => {
          this.instructions = data;
        });
      }
    })

    this.router.events.subscribe(
      event => {
        clearInterval(this.getInstructionsInterval);
        if (event instanceof NavigationEnd) {
          if (event.url === '/') {
            console.log(event);
          }
        }
      });
  }

  getInstructions() {
    this.instructionsServerices.getInstructions(this.auth.locationActive$.getValue()!.LocationId).toPromise().then(data => {
      this.instructions = data;
    });
  }

  ngOnDestroy() {
    clearInterval(this.getInstructionsInterval);
  }


  openDialog(intruction: Instruction, instructionNumber: number): void {
    if (!this.isInWorkInstructionMode && !this.isUnitSelected) {
      const dialogRef = this.dialog.open(IntructionDialogComponent, {
        data: {
          intruction: intruction,
          instructionNumber: instructionNumber
        }
      });

      dialogRef.afterClosed().subscribe(async (result) => {
        if (result) {
          this.instructionSelected = result.instruction;
          if (result.resultType === 'Complete') {
            this.completeWorkInstruction();
          } else if (result.resultType === 'Move') {
            this.yardStorageService.watingForSelectLocation$.next({ origen: this.instancia, data: true });
            this.yardStorageService.instructionSelected$.next({ origen: this.instancia, data: result.instruction });
          }
        }
      });
    }

  }

  async completeWorkInstruction() {
    if (this.auth.userInfo) {
      this.instructionSelected.CompletedById = this.auth.userInfo.UserId;
      this.instructionsServerices.completeWorkInstruction(this.instructionSelected).then(data => {
        alert(data);
        this.getInstructions();
        this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Update' });
      });
    }
  }

  async completeWorkInstructionToDiferentLocation(unit: unit, type: 'Null' | 'Instruction' | 'Unit') {
    this.instructionSelected.Depth = unit.depth;

    if (unit.isWheeled) {
      this.instructionSelected.Height = unit.height;
    } else {
      this.instructionSelected.Height = unit.height - 1;
    }

    this.instructionSelected.RowRecordId = unit.rowId;
    this.instructionSelected.StackRecordId = unit.stackId;

    if (type === 'Unit') {
      this.instructionSelected.UnitNumber = unit.unit.unitNumber;
    }

    if (type === 'Instruction') {
      await this.recalculateWorkInstruction(unit);
    }

    await this.completeWorkInstruction();

    this.yardStorageService.updateData$.next({ origen: this.instancia, data: 'Update' });
    this.cancelMoveWaiting();
    this.getInstructions();
  }


  async recalculateWorkInstruction(unit: unit) {
    let instruction = this.instructions.filter(i => i.UnitNumber === unit.unit.UnitNumber)[0]

    if (instruction.UnitNumber === this.instructionSelected.UnitNumber) {
      throw new Error("Same Instruction")
    }
    let instructionToRecalculate: UnitAllocationPayload = {
      OriginalYardLocation: 3,
      YardLayoutId: 3,
      StackRecordId: unit.stackId,
      workInstruction: instruction,
      activeUnits: null
    }
    await this.instructionsServerices.recalculateWorkInstruction(instructionToRecalculate);
  }


  cancelMoveWaiting() {
    this.yardStorageService.watingForSelectLocation$.next({ origen: this.instancia, data: false });
    this.yardStorageService.instructionSelected$.next({ origen: this.instancia, data: null });
    this.yardStorageService.unitSelectedForSelectLocation$.next({ origen: this.instancia, data: null });
  }

  createGetInstructionsInterval() {
    this.getInstructionsInterval = setInterval(() => {
      this.getInstructions();
    }, 30000)
  }

}
