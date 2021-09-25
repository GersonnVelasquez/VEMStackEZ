import { YardLocation } from "../models/yard.model";
import { NormalState } from "./normalMode.state";
import { State } from "./state.abstract";


export class UnitSelected extends State {

    public async selectLocation(yardLocation: YardLocation) {
        if (yardLocation?.type === 'Null') {
            await this.context.updateUnitLocation(yardLocation);
         
            this.context.getUnitsAndSetInventory();
            this.context.resetSelectedLocation();
            this.context.changeState(new NormalState());
        }
    }

    public cancelOperation() {
        this.context.resetSelectedLocation();
        this.context.changeState(new NormalState());
    }

}