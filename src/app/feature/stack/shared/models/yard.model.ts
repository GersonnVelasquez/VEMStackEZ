import { BehaviorSubject, Subject } from "rxjs";
import { ActiveUnit, Units, WorkInstruction } from "./units.model";
import { YardLayout } from "./yard-layout.model";

export class Yard {

    layout = new BehaviorSubject<unit[][]>([]);
    row: number;
    stack: number;
    height = 5;
    depth = 6;
    yardLayout: YardLayout;
    rowPosition = 0;
    stackPosition = 0;
    units: Units;
    getUnitFn: Function;
    // selectedUnit$ = new Subject<unit | null>();
    // selectedUnit: unit | null = null;
    // selectedWorkInstruction = new BehaviorSubject<string | null>(null);

    constructor(yardLayout: YardLayout, getUnitFn: Function) {
        this.start(yardLayout, getUnitFn);
    }

    async start(yardLayout: YardLayout, getUnitFn: Function) {
        this.yardLayout = yardLayout;
        this.row = this.yardLayout.Rows[this.rowPosition].RecordId;
        this.stack = this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].RecordId;
        this.height = this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].Height;
        this.depth = this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].Depth;
        this.getUnitFn = getUnitFn;
        this.units = await this.getUnitFn(this.rowNumber, this.yardLayout.RecordId);
        this.setInventory();
    }

    get rowNumber() {
        return this.yardLayout.Rows[this.rowPosition].Number;
    }

    get rowsNumbers() {
        return this.yardLayout.Rows.map(i => {
            return i.Number;
        });
    }

    get rowsRecordId() {
        return this.yardLayout.Rows.map(i => {
            return i.RecordId;
        });
    }

    get isWheeled() {
        return this.yardLayout.Rows[this.rowPosition].Wheeled;
    }

    get stacksRecordIdInRow() {
        return this.yardLayout.Rows[this.rowPosition].Stacks.map(i => {
            return i.RecordId
        });
    }

    get stacksNumbersInRow() {
        return this.yardLayout.Rows[this.rowPosition].Stacks.map(i => {
            return i.Number
        });
    }

    get stackNumber() {
        return this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].Number;
    }

    get rowRecordId() {
        return this.yardLayout.Rows[this.rowPosition].RecordId;
    }

    get stackRecordId() {
        return this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].RecordId;
    }


    getUnitWithPositionUdated(unit: unit, lostUnit: unit) {
        let newUnit = lostUnit.unit;
        newUnit.StackRecordId = this.isWheeled ? unit.stackId : this.stackRecordId;
        newUnit.RowRecordId = this.rowRecordId;
        newUnit.Depth = this.isWheeled ? 0 : unit.depth;
        newUnit.Height = this.isWheeled ? 0 : unit.height - 1;

        return newUnit;
    }


    // selectUnit(unit: unit) {
    //     if (unit.unit) {
    //         if (unit.type === "Unit") {
    //             this.selectedUnit$.next(unit);
    //             this.selectedUnit = unit;
    //         } else {
    //             this.selectedWorkInstruction.next(unit.unit.UnitNumber);
    //         }
    //     }
    // }


    // resetSelectedUnit() {
    //     this.selectedUnit$.next(null);
    //     this.selectedUnit = null;
    // }

    async nextRow() {
        this.stackPosition = 0;
        let nextPos = this.rowPosition + 1
        if (nextPos < this.yardLayout.Rows.length) {
            this.rowPosition++;
        } else {
            this.rowPosition = 0;
        }

        await this.getUnitsAndSetInventory();
    }


    async setManualRow(rowNumber: string) {
        this.stackPosition = 0;
        this.rowPosition = this.rowsNumbers.indexOf(rowNumber);
        await this.getUnitsAndSetInventory();
    }

    async setManualStack(stackNumber: string) {
        this.stackPosition = this.stacksNumbersInRow.indexOf(stackNumber);
        this.setInventory();
    }

    async setManualRowByRecordId(recordId: number) {
        this.stackPosition = 0;
        this.rowPosition = this.rowsRecordId.indexOf(recordId);
        await this.getUnitsAndSetInventory();
    }
    async setManualStackByRecordId(recordId: number) {
        this.stackPosition = this.stacksRecordIdInRow.indexOf(recordId);
        this.setInventory();
    }




    async getUnitsAndSetInventory() {
        if (this.yardLayout) {
            this.units = await this.getUnitFn(this.rowNumber, this.yardLayout.RecordId);
            this.setInventory();
        }
    }

    async prevRow() {
        this.stackPosition = 0;
        let nextPos = this.rowPosition - 1
        if (nextPos >= 0) {
            this.rowPosition--;
        }
        else {
            this.rowPosition = this.yardLayout.Rows.length - 1;
        }
        await this.getUnitsAndSetInventory();
    }


    nextStack() {
        let nextPos = this.stackPosition + 1
        if (nextPos < this.yardLayout.Rows[this.rowPosition].Stacks.length) {
            this.stackPosition++;

        } else {
            this.stackPosition = 0;
        }
        this.setInventory();
    }

    prevStack() {
        let nextPos = this.stackPosition - 1
        if (nextPos >= 0) {
            this.stackPosition--;
        } else {
            this.stackPosition = this.yardLayout.Rows[this.rowPosition].Stacks.length - 1;
        }
        this.setInventory();
    }

    setInventory() {
        this.row = this.yardLayout.Rows[this.rowPosition].RecordId;
        this.stack = this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].RecordId;
        this.height = this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].Height;
        this.depth = this.yardLayout.Rows[this.rowPosition].Stacks[this.stackPosition].Depth;
        if (this.isWheeled) {
            this.setWheeledInvetory();
        }
        else {
            this.setNormalInvetory();
        }
    }


    setNormalInvetory() {
        let heightArrar: unit[][] = [];
        let depthArrar: unit[] = [];
        for (let h = this.height; h > 0; h--) {
            for (let d = 0; d < this.depth; d++) {
                let WorkInstruction = this.getWorkInstructions(h - 1, d);
                let ActiveUnit = this.getActiveUnits(h - 1, d);
                if (ActiveUnit) {
                    let unit: unit = {
                        unit: ActiveUnit,
                        type: "Unit",
                        depth: d,
                        height: h,
                        stackId: this.stackRecordId,
                        rowId: this.rowRecordId
                    }
                    depthArrar.push(unit);
                } else if (WorkInstruction) {
                    let unit: unit = {
                        unit: WorkInstruction,
                        type: "Instruction",
                        depth: d,
                        height: h,
                        stackId: this.stackRecordId,
                        rowId: this.rowRecordId
                    }
                    depthArrar.push(unit);
                }
                else {
                    let unit: unit = {
                        unit: null,
                        type: "Null",
                        depth: d,
                        height: h,
                        stackId: this.stackRecordId,
                        rowId: this.rowRecordId
                    }
                    depthArrar.push(unit)
                }


            }
            heightArrar.push(depthArrar);
            depthArrar = [];
        }
        this.layout.next(heightArrar);
    }

    setWheeledInvetory() {
        let heightArrar: unit[][] = [];
        let depthArrar: unit[] = [];
        let depth = this.yardLayout.Rows[this.rowPosition].Stacks.length
        for (let d = 0; d < depth; d++) {
            let WorkInstruction = this.getWorkInstructions(0, d, this.yardLayout.Rows[this.rowPosition].Stacks[d].RecordId);
            let ActiveUnit = this.getActiveUnits(0, d, this.yardLayout.Rows[this.rowPosition].Stacks[d].RecordId);
            if (ActiveUnit) {
                let unit: unit = {
                    unit: ActiveUnit,
                    type: "Unit",
                    depth: 0,
                    height: 0,
                    stackId: this.yardLayout.Rows[this.rowPosition].Stacks[d].RecordId,
                    rowId: this.rowRecordId,
                    stackNumber: this.yardLayout.Rows[this.rowPosition].Stacks[d].Number
                }
                depthArrar.push(unit);
            } else if (WorkInstruction) {
                let unit: unit = {
                    unit: WorkInstruction,
                    type: "Instruction",
                    depth: 0,
                    height: 0,
                    stackId: this.yardLayout.Rows[this.rowPosition].Stacks[d].RecordId,
                    rowId: this.rowRecordId,
                    stackNumber: this.yardLayout.Rows[this.rowPosition].Stacks[d].Number
                }
                depthArrar.push(unit);
            }
            else {
                let unit: unit = {
                    unit: null,
                    type: "Null",
                    depth: 0,
                    height: 0,
                    stackId: this.yardLayout.Rows[this.rowPosition].Stacks[d].RecordId,
                    rowId: this.rowRecordId,
                    stackNumber: this.yardLayout.Rows[this.rowPosition].Stacks[d].Number
                }
                depthArrar.push(unit)
            }


        }

        heightArrar.push(depthArrar);
        this.layout.next(heightArrar);
    }


    getWorkInstructions(Height: number, Depth: number, StackRecordId?: number) {
        if (this.units) {
            let unit: WorkInstruction[];
            if (this.isWheeled) {
                unit = this.units.WorkInstructions.filter(i => i.RowRecordId === this.row &&
                    i.StackRecordId === StackRecordId &&
                    i.Depth === 0 &&
                    i.Height === 0)
            } else {
                unit = this.units.WorkInstructions.filter(i => i.RowRecordId === this.row &&
                    i.StackRecordId === this.stack &&
                    i.Depth === Depth &&
                    i.Height === Height)
            }




            if (unit.length > 0) {
                return unit[0];
            }
            return null;
        }
        return null;
    }


    getActiveUnits(Height: number, Depth: number, StackRecordId?: number) {
        if (this.units) {
            let unit: ActiveUnit[];
            if (this.isWheeled) {
                unit = this.units.ActiveUnits.filter(i => i.RowRecordId === this.row &&
                    i.StackRecordId === StackRecordId &&
                    i.Depth === 0 &&
                    i.Height === 0)
            } else {
                unit = this.units.ActiveUnits.filter(i => i.RowRecordId === this.row &&
                    i.StackRecordId === this.stack &&
                    i.Depth === Depth &&
                    i.Height === Height)
            }

            if (unit.length > 0) {
                return unit[0];
            }
            return null;
        }
        return null;
    }
}


export interface unit {
    unit: any;
    type: 'Instruction' | 'Unit' | 'Null';
    depth: number,
    height: number,
    stackId: number,
    rowId: number,
    stackNumber?: string
}