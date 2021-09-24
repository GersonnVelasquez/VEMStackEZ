import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicToolModule } from '../tools/ionic/ionic.module';
import { MaterialModule } from '../tools/material/material.module';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    IonicToolModule,
    MaterialModule
  ],
  exports:[
    NavbarComponent,
    MenuComponent,
    SearchPipe
  ]
})
export class SharedModule { }
