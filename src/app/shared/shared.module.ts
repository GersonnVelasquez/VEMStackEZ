import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicToolModule } from '../tools/ionic/ionic.module';
import { MaterialModule } from '../tools/material/material.module';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent,
    SearchPipe,
    SortByPipe
  ],
  imports: [
    CommonModule,
    IonicToolModule,
    MaterialModule
  ],
  exports:[
    NavbarComponent,
    MenuComponent,
    SearchPipe,
    SortByPipe
  ]
})
export class SharedModule { }
