import { unit } from "../models/yard.model";
import { NormalState } from "./normalMode.state";
import { State } from "./state.abstract";


export class UnitSelected extends State {

    public async selectUnit(unit: unit) {
        if (unit?.type === 'Null') {
            await this.context.updateUnitLocation(unit)
            this.context.transitionTo(new NormalState());
        }
    }

    public cancelOperation(){
        this.context.transitionTo(new NormalState());
    }

}