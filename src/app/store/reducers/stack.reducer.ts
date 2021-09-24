import { createReducer, on } from '@ngrx/store';
import { cargarLayout, cargarLayoutListo, selccionarUnit } from '../actions';
import { YardLayout } from 'src/app/feature/stack/shared/models/yard-layout.model';
import { unit } from 'src/app/feature/stack/shared/models/yard.model';

export interface StackState {
    YardLayout: YardLayout | null,
    unitSelected: unit | null
}

export const StackInitialState: StackState = {
    YardLayout: null,
    unitSelected: null
}

const _StackReducer = createReducer(StackInitialState,

    on(cargarLayout, (state) => ({ ...state })),


    on(cargarLayoutListo, (state, { layout }) => ({
        ...state,
        YardLayout: { ...layout }
    })),

    on(selccionarUnit, (state, { unit }) => {
        return {
            ...state,
            unitSelected: { ...unit }
        }
    }
    
    ),

);

export function StackReducer(state: any, action: any) {
    return _StackReducer(state, action);
}