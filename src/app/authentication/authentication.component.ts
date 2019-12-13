import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { User } from '../user';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  toggleAuthentication: boolean = true;
  guest: User = new User();
  
  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
	  if(this._authenticationService.isAuthenticated()) this._router.navigate(['/dashboard']);
  }
  
  authenticate(buttons: boolean): void{
	  this.toggleAuthentication = buttons;
  }
  
  authenticated(): void{
    this._router.navigate(['/dashboard']); return;
  }

}
