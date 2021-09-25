import { createAction, props } from '@ngrx/store';
import { StackComponent } from 'src/app/feature/stack/components/stack/stack.component';
import { YardLocation } from 'src/app/feature/stack/shared/models/yard.model';
import { State } from 'src/app/feature/stack/shared/state-class/state.abstract';
import { YardLayout } from "../../feature/stack/shared/models/yard-layout.model";


export const cargarLayout = createAction(
    '[Stack] Cargar Layout',
    props<{ recordId: number }>()
);

export const cargarLayoutListo = createAction(
    '[Stack] Cargar Layout Listo',
    props<{ layout: YardLayout }>()
);

export const selccionarUnit = createAction(
    '[Stack] Seleccionar Unit',
    props<{ unit: YardLocation }>()
);

export const resetUnitSelected = createAction(
    '[Stack] Resetear Unit Sekected'
);

export const cambiarEstado = createAction(
    '[Stack] Cambia el estado del stack',
    props<{ estado: State }>()
);
