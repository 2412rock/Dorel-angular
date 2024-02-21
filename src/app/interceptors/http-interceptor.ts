import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class DorelHttpInterceptor implements HttpInterceptor {
  constructor(
    private localStorage: LocalstorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // You can modify the request here, add headers, etc.
    // For example, adding a custom header:
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.localStorage.getAccessToken()}`
      }
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}