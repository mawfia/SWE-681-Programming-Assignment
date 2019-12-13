import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../authentication.component.css']
})
export class RegistrationComponent implements OnInit {
  states: string[] = ['Alaska', 'Alabama', 'Arizona', 'Arkansas','California','Colorado','Conneticuit', 'Delaware', 'District of Columbia', 'Florida', 
					  'Georgia', 'Hawaii', 'Idaho', 'Indiana', 'Illinois', 'Iowa', 'Louisiana', 'Kentucky', 'Maine', 'Maryland', 'Massachuesetts', 
					  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'New Jersey', 'New Mexico','New York','New Hampshire','North Carolina',
					  'North Dakota', 'Nevada', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania','Rhode Island','South Dakota', 'Tennessee','Texas','Utah',
					  'Vermont', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming','Virginia'];
  
  user: User = new User();
  @Input() guest: User;
  @Output() authenticated = new EventEmitter();
  //guest: User = new User();
  errors: null;
  
  constructor(private _authenticationService: AuthenticationService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
	  if(this._authenticationService.isAuthenticated()) this._router.navigate(['/dashboard']);
  }
  
  register(guest: User): void{
	
	this._authenticationService.registerUser(this.guest).subscribe( result => { 
			if(result['message'] == "Success") this.authenticated.emit();
			else if(result['message'] == "Error") { this.errors = result['errors']; }
		});
  }
}
