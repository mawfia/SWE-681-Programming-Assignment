import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import * as $ from 'jquery';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { SocketService } from "../services/socket.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User = new User();

  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router, private _socket: SocketService) { }

  ngOnInit() {
    /*this.socket.on('greeting', data => {

      console.log(data.msg);
    })*/

    //this._socket.getMessages().subscribe( result => { if(result['msg'] === "logout") { this._authenticationService.logout().subscribe( () => this._router.navigate(['/']) )}});
    //this._socket.connectSocket();

    //this._socket.sendMessage("This should work for updating all bidders.");

	   this._authenticationService.getLoggedInUser().subscribe( success => this.user = success['user'] );

       $('body').css({'background-image':'url(assets/stonewall9.jpg)'});
       $('title').text('Bicycle Marketplace | Dashboard');
    }

}
