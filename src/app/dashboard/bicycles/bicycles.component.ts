import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-bicycles',
  templateUrl: './bicycles.component.html',
  styleUrls: ['./bicycles.component.css']
})
export class BicyclesComponent implements OnInit {
  user: User = new User();

  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
	  this._authenticationService.getLoggedInUser().subscribe( success => this.user = success['user'] );
	  
	  //this.user = this._authenticationService.getLoggedInUser();
  }

}
