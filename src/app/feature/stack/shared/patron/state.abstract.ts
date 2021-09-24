import { StackComponent } from "../../components/stack/stack.component";
import { unit } from "../models/yard.model";

export abstract class State {
    protected context: StackComponent;
    public unitSelected: unit | null = null;

    public setContext(context: StackComponent, estado: string) {

        if (estado === 'NormalState') {
            context.getUnitsAndSetInventory();
            context.resetSelectedUnit();
        }

        this.context = context;
    }

    public abstract selectUnit(unit: unit): void;
    public abstract cancelOperation(): void;

}


interface IStackComponentProperties {

}