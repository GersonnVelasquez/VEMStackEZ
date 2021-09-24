import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpService } from './services/http.service';
import { AuthStateService } from './services/auth-state.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { YardStorageService } from './storage/yard-storage.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    StorageService,
    HttpService,
    AuthStateService,
    YardStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class CoreModule { }
