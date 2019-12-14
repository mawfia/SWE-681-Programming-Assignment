import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService, public _router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let token: any = localStorage.getItem('token');
      request = token !== null ? request.clone({ setHeaders: { Authorization: token } }) : request;

      return next.handle(request).pipe( tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
      }), catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {

              console.log("error code logging out.");
              this.auth.logout().subscribe( () => this._router.navigate(['/']) );
            }
            if(err.status === 429){ // Measn too many login attempts

             }
          }
          return throwError(err);
        }));
  }
}
