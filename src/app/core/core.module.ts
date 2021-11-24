import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpService } from './services/http.service';
import { AuthStateService } from './services/auth-state.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { YardStorageService } from './storage/yard-storage.service';
import { ErrorDialogComponent } from './errorHandler/error-dialog/error-dialog.component';
import { MyErrorHandler } from './errorHandler/error.errorhandler';
import { MaterialModule } from '../tools/material/material.module';
import { LoadingService } from './services/loading.service';
import { HttpLoadingInterceptor } from './interceptors/http-loading.interceptor';
import { ColorRulesService } from './services/color-rules.service';

import { LocationSelectDialogComponent } from './components/location-select-dialog/location-select-dialog.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations:[
    ErrorDialogComponent,
    LoadingComponent,
    LocationSelectDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    StorageService,
    HttpService,
    AuthStateService,
    YardStorageService,
    LoadingService,
    ColorRulesService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true },
    { provide: ErrorHandler, useClass: MyErrorHandler },
  ]
})
export class CoreModule { }
