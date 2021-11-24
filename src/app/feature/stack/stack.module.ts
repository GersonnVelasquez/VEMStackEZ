import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackComponent } from './components/stack/stack.component';
import { StackService } from './shared/services/stack.service';
import { MaterialModule } from 'src/app/tools/material/material.module';
import { ChoosePositionDialogComponent } from './components/choose-position-dialog/choose-position-dialog.component';
import { LostUnitDialogComponent } from './components/lost-unit-dialog/lost-unit-dialog.component';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUnitDialogComponent } from './components/new-unit-dialog/new-unit-dialog.component';

@NgModule({
  declarations: [
    StackComponent,
    ChoosePositionDialogComponent,
    LostUnitDialogComponent,
    SearchDialogComponent,
    NewUnitDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ], 
  providers:[
    StackService
  ],
  exports:[
    StackComponent
  ]
})
export class StackModule { }
