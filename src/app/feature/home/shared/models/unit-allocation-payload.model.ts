import { ActiveUnit, WorkInstruction } from "src/app/feature/stack/shared/models/units.model";

export interface UnitAllocationPayload {
    YardLayoutId: number,
    OriginalYardLocation: number,
    activeUnits?: ActiveUnit | null,
    workInstruction: WorkInstruction
    StackRecordId: number
}