import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, Observer, Subscription, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user';
import { CookieService } from 'ngx-cookie';
import { JwtHelper } from './jwt-helper';
import { SocketService } from "./socket.service";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public userObservers: BehaviorSubject<any[]> = new BehaviorSubject([]);

  private httpOptions: any = {
    observe : 'response',
    responseType: 'json'
  };

  private helper: JwtHelper = new JwtHelper();
  public message: String = null;

  constructor(private _http: HttpClient, private _cookieService: CookieService, private _socket: SocketService) {
  }

  loginUser(user: User): Observable<any>{

    return this._http.post<any>('/login', user, this.httpOptions);

  }

  registerUser(user: User): Observable<any>{

		return this._http.post<User>('/register', user, this.httpOptions);

  }

  getSellersName(ids: string[]): Observable<any>{

    return this._http.post<User>('/sellers/name', {ids:ids});

  }

  getLoggedInUser(): Observable<User>{
    let user = this.helper.decodeToken(localStorage.getItem('token')) != null ?
      this.helper.decodeToken(localStorage.getItem('token')).userID : null;

    return this._http.post<User>(`/user`, { id: user });
  }

  getFirstName(): string{
    return this.helper.decodeToken(localStorage.getItem('token')).first_name;
  }

  logout(): Observable<{}>{
    this.clear();
	  return this._http.delete('/logout');
  }

  clear(): void{
    localStorage.clear();
  }

  renewToken(): void {

    if(this.helper.isTokenExpired(localStorage.getItem('token'), 600)){ // checks if token is within 10 minutes (600) of expiration

      this._http.get<any>('/user/token', this.httpOptions).subscribe( (resp: HttpResponse<any>) => {
        localStorage.setItem('token', resp.headers.get('token'));

      });
    }
  }

  isAuthenticated(): boolean{
	 
    let token: any = localStorage.getItem('token');
    let expired: boolean = true;
    if(token && token != 'null') expired = this.helper.isTokenExpired(token);
    if(token && !expired) this._socket.connectSocket();
    return token !== null && !expired;
  }



}
