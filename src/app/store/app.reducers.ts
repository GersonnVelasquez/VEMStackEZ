import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
   stack: reducers.StackState,
}



export const appReducers: ActionReducerMap<AppState> = {
   stack: reducers.StackReducer
}