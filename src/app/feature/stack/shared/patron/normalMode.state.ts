import { unit } from "../models/yard.model";
import { State } from "./state.abstract";
import { UnitSelected } from "./unitSelected.state";


export class NormalState extends State {

    public selectUnit(unit: unit) {
        if (unit.type === 'Unit') {
            this.context.yard.selectUnit(unit);
            this.context.transitionTo(new UnitSelected())
        }
    }

    public cancelOperation(){
        
    }

}