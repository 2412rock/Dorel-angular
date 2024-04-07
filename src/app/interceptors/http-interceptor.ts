import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, from, switchMap, throwError } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { LoginService } from '../services/login.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Injectable()
export class DorelHttpInterceptor implements HttpInterceptor {
  constructor(
    private localStorage: LocalstorageService,
    private loginService: LoginService,
    private modalService: ModalService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // You can modify the request here, add headers, etc.
    // For example, adding a custom header:
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.localStorage.getAccessToken()}`
      }
    });

    // Pass the modified request to the next handler
     return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Handle 403 response, for example, redirect to a login page
          return from(this.refreshTokenAndRetry(request, next));
        }
        else if (error.status === 401) {
          this.localStorage.deleteUserData();
          this.modalService.openModalNotification("Unauthorized", "You do not have permissions here. Please log in", false);
          this.router.navigate(['./basic-search-page']);
        }
        // Pass the error through to the calling code
        return throwError(error);
      })
    );
  }

  // Simulate refreshing the access token (replace with your actual logic)
  private refreshTokenAndRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Call your token refresh service
    return this.loginService.refreshToken(this.localStorage.getRefreshToken()).pipe(
      switchMap(response => {
        if (response.isSuccess) {
          // If token refresh was successful, update the access token and re-run the request
          this.localStorage.setAccessToken(response.data);
          const modifiedRequest = request.clone({
            setHeaders: {
              'Authorization': `Bearer ${response.data}`
            }
          });
          return next.handle(modifiedRequest);
        } else {
          // If token refresh failed, logout the user
          this.localStorage.deleteUserData();
          this.modalService.openModalNotification("Session expired", "Please log in again to use the app", false);
          this.router.navigate(['./basic-search-page']);
          return throwError('Token refresh failed');
        }
      }),
      catchError(error => {
        // Handle token refresh error
        console.log(error);
        return throwError(error);
      })
    );
  }
}