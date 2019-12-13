import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.component.css']
})
export class LoginComponent implements OnInit {

  user: User = null;
  //guest: User = new User();
  @Input() guest: User;
  @Output() authenticated = new EventEmitter();
  
  error: String = null;

  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
	  
  }

  login(guest: User): void{
	this._authenticationService.loginUser(this.guest).subscribe( result => {
		if(result['message'] == "Success") this.authenticated.emit();
		else this.error = result['error'];
	});
  }
  
}
