import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthStateService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.token;
    if (!token) {
      return next.handle(request);
    }
    const headers = request.clone({
      setHeaders: { Authorization: `Bearer ${token.access_token}` }
    });
    return next.handle(headers);
  }
}
