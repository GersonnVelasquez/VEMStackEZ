import { createReducer, on } from '@ngrx/store';
import { cambiarEstado, cargarLayout, cargarLayoutListo, resetUnitSelected, selccionarUnit } from '../actions';
import { YardLayout } from 'src/app/feature/stack/shared/models/yard-layout.model';
import { YardLocation } from 'src/app/feature/stack/shared/models/yard.model';
import { State } from 'src/app/feature/stack/shared/state-class/state.abstract';
import { NormalState } from 'src/app/feature/stack/shared/state-class/normalMode.state';

export interface StackState {
    unitSelected: YardLocation | null
}

export const StackInitialState: StackState = {
    unitSelected: null,
}

const _StackReducer = createReducer(StackInitialState,

    on(selccionarUnit, (state, { unit }) => {
        return {
            ...state,
            unitSelected: { ...unit }
        }
    }),

    on(resetUnitSelected, (state) => ({
        ...state,
        unitSelected: null
    })),

);

export function StackReducer(state: any, action: any) {
    return _StackReducer(state, action);
}




export interface YardState {
    YardLayout: YardLayout | null,
}

export const YardInitialState: YardState = {
    YardLayout: null,
}

const _YardReducer = createReducer(YardInitialState,

    on(cargarLayout, (state) => ({ ...state })),


    on(cargarLayoutListo, (state, { layout }) => ({
        ...state,
        YardLayout: { ...layout }
    })),
);

export function YardReducer(state: any, action: any) {
    return _YardReducer(state, action);
}








export interface YardEstadoState {
    estado: any | null,
}

export const YardEstadoInitialState: YardEstadoState = {
    estado: new NormalState(),
}

const _YardEstadoReducer = createReducer(YardEstadoInitialState,
    on(cambiarEstado, (state, { estado }) => ({
        ...state,
        estado: {...estado} 
    })),
);

export function YardEstadoReducer(state: any, action: any) {
    return _YardEstadoReducer(state, action);
}


