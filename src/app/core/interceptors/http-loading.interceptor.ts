import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private loading: LoadingService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loading.presentLoading();

    return next.handle(request).pipe(
      finalize(async () => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          await this.loading.dismissLoading();
        }
      })
    );
  }
}
