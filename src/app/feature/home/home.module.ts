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
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    IntructionsComponent,
    IntructionDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicToolModule,
    MaterialModule,
    StackModule,
    SharedModule,
    FormsModule
  ]
})
export class HomeModule { }
