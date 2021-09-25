import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicToolModule } from '../tools/ionic/ionic.module';
import { MaterialModule } from '../tools/material/material.module';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search.pipe';
import { TrackByPipe } from './pipes/track-by.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    MenuComponent,
    SearchPipe,
    TrackByPipe
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
    TrackByPipe
  ]
})
export class SharedModule { }
