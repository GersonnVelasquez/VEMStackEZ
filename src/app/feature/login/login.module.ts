import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { IonicToolModule } from 'src/app/tools/ionic/ionic.module';
import { MaterialModule } from 'src/app/tools/material/material.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IonicToolModule,
    FormsModule,
    MaterialModule
  ]
})
export class LoginModule { }
