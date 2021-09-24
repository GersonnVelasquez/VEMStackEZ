import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as stackActions from '../actions/stack.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { StackService } from 'src/app/feature/stack/shared/services/stack.service';
import { YardLayout } from 'src/app/feature/stack/shared/models/yard-layout.model';



@Injectable()
export class StackEffects {

    constructor(
        private actions$: Actions,
        private stackService: StackService
    ) { }


    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(stackActions.cargarLayout),
            mergeMap(
                (actions) => 
                this.stackService.getYardLayouts(actions.recordId)
                    .pipe(
                        map(data => stackActions.cargarLayoutListo({ layout: data })),
                    )
            )
        )
    );



    
}