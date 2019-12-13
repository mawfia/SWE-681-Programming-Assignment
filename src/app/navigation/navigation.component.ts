import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-navigation',
  template: `
	<button (click)="logout()" *ngIf="loggedIn">Logout</button>
	<a *ngIf="navButtons[0]" [routerLink]="['/dashboard']">Dashboard</a>
	<a *ngIf="navButtons[1]" [routerLink]="['/bicycles']">Bicycles</a>
	<a *ngIf="navButtons[2]" [routerLink]="['/my_bicycles']">My Bicycles</a>
  `,
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	
  loggedIn: boolean = false;
  navButtons: boolean[] = [false, true, true];

  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
	  this.loggedIn = this._authenticationService.isAuthenticated();
	  this._route.url.subscribe( success => {
		
		  if(success.length > 0){
				if(success[0].path == "dashboard") this.navButtons = [false, true, true]; //[login, register]
				else if(success[0].path == "bicycles") this.navButtons = [true, false, true];
				else if(success[0].path == "my_bicycles") this.navButtons = [true, true, false];
				else this.navButtons = [true, false, false];
		  }
		  else this.navButtons = [false, false, false];
	  
	  })
  }
  
  logout(){	  
	  this._authenticationService.logout().subscribe( success => { this._router.navigate(['/']); } );
  }

}
