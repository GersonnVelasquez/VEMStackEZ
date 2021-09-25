import { YardLocation } from "../models/yard.model";
import { State } from "./state.abstract";
import { UnitSelected } from "./unitSelected.state";


export class NormalState extends State {

    public selectLocation(yardLocation: YardLocation) {
        console.log(yardLocation)
        if (yardLocation.type === 'Unit') {
            this.context.setSelectedLocation(yardLocation);
            this.context.changeState(new UnitSelected())
        }
    }

    public cancelOperation() {

    }

}