import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { mapTo } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthenticationService, private _cookieService: CookieService, private _router: Router, private _route: ActivatedRoute) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.performCheck(childRoute, state);
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.performCheck(next, state);
  }


  /**
   * this is method does the checking for us, according to the below process
   * 1. check if the user is authenticated, if so check if is time to refresh token the return the observable
   * so our guard can resolve it, since the retrieve method is already handling the response with `do` we just map this
   * to true default so next view can check and see if the new token is valid or not
   *
   * 2. if the above from 1 pass through without returning it means it was false all the way
   * so we handle it by passing a message and updating the redirectUrl so users can continue where they left of
   * after authentication
   * @param next
   * @param state
   * @returns {any}
   */
  private performCheck(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {


    if(this._authService.isAuthenticated()){
      let url = this._cookieService.get('url') || '/';

      if(state.url !== '/') this._cookieService.put('url', state.url);
      this._authService.renewToken();

      if(state.url === '/' || state.url === '/login' || state.url === '/register'){

        if(url === '/' || url === '/login' || url === '/register') this._router.navigate(['/dashboard']);
        else this._router.navigate([url]);
      }

      return true;
    }

    let token = localStorage.getItem('token');
    if(token && token != 'null') this._authService.logout().subscribe( ()=> { this._router.navigate(['/']); this._authService.message = "Session expired, please login again."; });
    else if(['/bicycles','/my_bicycles','/dashboard'].includes(state.url) || /^\/bicycle\/[\w]{24}$/.test(state.url)) { this._authService.message = "Please login or register first."; this._router.navigate(['/']);}
    else if(state.url !== '/') { this._authService.message = "Invalid URL entered."; this._router.navigate(['/']); }

    return true;
  }

}
