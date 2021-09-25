import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackComponent } from './components/stack/stack.component';
import { StackService } from './shared/services/stack.service';
import { MaterialModule } from 'src/app/tools/material/material.module';
import { ChoosePositionDialogComponent } from './components/choose-position-dialog/choose-position-dialog.component';
import { LostUnitDialogComponent } from './components/lost-unit-dialog/lost-unit-dialog.component';
import { StoreModule } from '@ngrx/store';
import { StackReducer } from 'src/app/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from 'src/app/store/effects';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    StackComponent,
    ChoosePositionDialogComponent,
    LostUnitDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    EffectsModule.forFeature(EffectsArray)
  ],
  providers: [
    StackService
  ],
  exports: [
    StackComponent
  ]
})
export class StackModule { }
