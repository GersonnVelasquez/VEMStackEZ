import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducers";
import { StackComponent } from "../../components/stack/stack.component";
import { YardLocation } from "../models/yard.model";

export abstract class State {
    protected context: StackComponent;

    public setContext(context: StackComponent) {
        this.context = context;
    }

    public abstract selectLocation(yardLocation: YardLocation): void;
    public abstract cancelOperation(): void;

}
