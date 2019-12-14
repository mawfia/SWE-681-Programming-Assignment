import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, Observer } from 'rxjs';
import * as io from 'socket.io-client';
//import { logout } from "./authentication.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any = null;
  URL: string = 'https://localhost:8000/image/';

  constructor() { }

  connectSocket(): void{
    if(!this.socket || !this.socket.connected){ this.socket = io.connect('https://localhost:8000', {query: {token: localStorage.getItem('token')}}); }

  }

  renewToken(): void{
    this.socket.emit('token', localStorage.getItem('token'));
  }

  disconnectSocket(): void{
    this.socket.disconnect();
  }

  sendMessage(message: string, data?: any): void{
    this.socket.emit(`${message}`, data);
  }

  getMessages(): Observable<any> {
    let observable = new Observable(observer => {

      this.socket.on('greeting', (data) => {
        observer.next(data);
      });

      this.socket.on('message', data => {
        observer.next(data);
        console.log(data);
      });

      this.socket.on('update', data => {
        observer.next(data);
      });

      this.socket.on('logout', data => {
        observer.next(data);

      })

    })
    return observable;
  }

}
