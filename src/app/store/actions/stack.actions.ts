import { createAction, props } from '@ngrx/store';
import { unit } from 'src/app/feature/stack/shared/models/yard.model';
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
    props<{ unit: unit }>()
);