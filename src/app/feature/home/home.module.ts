import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { IonicToolModule } from 'src/app/tools/ionic/ionic.module';
import { MaterialModule } from 'src/app/tools/material/material.module';
import { IntructionsComponent } from './components/intructions/intructions.component';
import { IntructionDialogComponent } from './components/intruction-dialog/intruction-dialog.component';
import { StackModule } from '../stack/stack.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ListViewFilterDialogComponent } from './components/list-view-filter-dialog/list-view-filter-dialog.component';
import { InstructionOutboudModalComponent } from './components/instruction-outboud-modal/instruction-outboud-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    IntructionsComponent,
    IntructionDialogComponent,
    ListViewComponent,
    ListViewFilterDialogComponent,
    InstructionOutboudModalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicToolModule,
    MaterialModule,
    StackModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
