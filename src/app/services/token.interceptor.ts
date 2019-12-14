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
      //console.log(request.url);
      let token: any = localStorage.getItem('token');
      request = token !== null ? request.clone({ setHeaders: { Authorization: token } }) : request;

      return next.handle(request).pipe( tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          //console.log(event);
        }
      }), catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
              // redirect to the login route
              // or show a modal
              //this.auth.clear();
              //this._router.navigate(['/']);
              console.log("error code logging out.");
              this.auth.logout().subscribe( () => this._router.navigate(['/']) );
            }
            if(err.status === 429){ // Measn too many login attempts
              //console.log(err.error);
              //this.auth.message = err.error;
              //window.alert(err.error);
             }
          }
          return throwError(err);
        }));
  }
}
