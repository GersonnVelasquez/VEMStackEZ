import { BehaviorSubject } from "rxjs";
import { Units } from "./units.model";
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
    selectedUnit = new BehaviorSubject<unit | null>(null);
    selectedWorkInstruction = new BehaviorSubject<string | null>(null);

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

    get thereIsUnitSelected() {
        return this.selectedUnit.getValue() ? true : false;
    }


    getUnitWithPositionUdated(unit: unit) {
        let newUnit = this.selectedUnit.getValue()?.unit;
        newUnit.StackRecordId = this.stackRecordId;
        newUnit.RowRecordId = this.rowRecordId;
        newUnit.Depth = unit.depth;
        newUnit.Height = unit.height - 1;

        return newUnit;
    }


    selectUnit(unit: unit) {
        if (unit.unit) {
            if (unit.type === "Unit") {
                this.selectedUnit.next(unit);
            } else {
                this.selectedWorkInstruction.next(unit.unit.UnitNumber);
            }
        }
    }


    resetSelectedUnit() {
        this.selectedUnit.next(null);
    }

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


    async getUnitsAndSetInventory() {
        this.units = await this.getUnitFn(this.rowNumber, this.yardLayout.RecordId);
        this.setInventory();
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


    getWorkInstructions(Height: number, Depth: number) {
        if (this.units) {
            let unit = this.units.WorkInstructions.filter(i => i.RowRecordId === this.row &&
                i.StackRecordId === this.stack &&
                i.Depth === Depth &&
                i.Height === Height)
            if (unit.length > 0) {
                return unit[0];
            }
            return null;
        }
        return null;
    }


    getActiveUnits(Height: number, Depth: number) {
        if (this.units) {
            let unit = this.units.ActiveUnits.filter(i => i.RowRecordId === this.row &&
                i.StackRecordId === this.stack &&
                i.Depth === Depth &&
                i.Height === Height)
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
    rowId: number
}