import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
   stack: reducers.StackState,
   yard: reducers.YardState,
   estado: reducers.YardEstadoState
}



export const appReducers: ActionReducerMap<AppState> = {
   stack: reducers.StackReducer,
   yard: reducers.YardReducer,
   estado: reducers.YardEstadoReducer
}