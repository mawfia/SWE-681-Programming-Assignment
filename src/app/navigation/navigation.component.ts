import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-navigation',
  template: `
  <!--<div class="w3-bar w3-border w3-card-4 w3-light-grey">
  	<a class="w3-bar-item w3-button w3-border-right" href="" (click)="logout()" *ngIf="loggedIn">Logout</a>
  	<a class="w3-bar-item w3-button w3-border-right" *ngIf="navButtons[0]" [routerLink]="['/dashboard']">Dashboard</a>
  	<a class="w3-bar-item w3-button w3-border-right" *ngIf="navButtons[1]" [routerLink]="['/bicycles']">Bicycles</a>
  	<a class="w3-bar-item w3-button w3-border-right" *ngIf="navButtons[2]" [routerLink]="['/my_bicycles']">My Bicycles</a>
  </div>-->

  <div class="w3-sidebar w3-card-4 w3-bar-block w3-dark-grey w3-animate-left w3-opacity-min w3-mobile" id="mySidebar">
    <button class="w3-bar-item w3-black w3-button w3-large w3-border-bottom" (click)="w3_close()">Close &times;</button>
    <a href="#" class="w3-bar-item w3-grey w3-button w3-mobile" (click)="logout()">Logout</a>
    <a href="#" class="w3-bar-item w3-button w3-mobile" *ngIf="navButtons[0]" [routerLink]="['/dashboard']">Dashboard</a>
    <a href="#" class="w3-bar-item w3-button w3-mobile" *ngIf="navButtons[1]" [routerLink]="['/bicycles']">Bicycles</a>
    <a href="#" class="w3-bar-item w3-button w3-mobile" *ngIf="navButtons[2]" [routerLink]="['/my_bicycles']">My Bicycles</a>
</div>
<button class="w3-button w3-xlarge" (click)="w3_open()"><span style="color: lightgrey;">&#9776;</span></button>
  `,
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  loggedIn: boolean = false;
  navButtons: boolean[] = [false, true, true];
  //user: User = {};

  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {

	  this._route.url.subscribe( success => {

		  if(success.length > 0){
				if(success[0].path == "dashboard") this.navButtons = [false, true, true]; //[login, register]
				else if(success[0].path == "bicycles") this.navButtons = [true, false, true];
				else if(success[0].path == "my_bicycles") this.navButtons = [true, true, false];
				else this.navButtons = [true, true, true];
		  }
		  else this.navButtons = [false, false, false];

	  })
  }

  w3_open() {
      //document.getElementById("mySidebar").style.display = "block";
      $('#mySidebar').css('display','block');
  }
  w3_close() {
      //document.getElementById("mySidebar").style.display = "none";
      $('#mySidebar').css('display','none');
  }

  logout(){
	  this._authenticationService.logout().subscribe( success => { this._router.navigate(['/']); } );
  }

}
