import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { User } from '../../user';
import { Bicycle } from '../../bicycle';
//import * as $ from "../jquery-3.3.1.min.js";
import * as $ from 'jquery';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { BicycleService } from "../../services/bicycle.service";

@Component({
  selector: 'app-my-bicycles',
  templateUrl: './my-bicycles.component.html',
  styleUrls: ['./my-bicycles.component.css']
})
export class MyBicyclesComponent implements OnInit {
  
	public uploader: FileUploader = new FileUploader({url: '/image/create', itemAlias: 'image'});
  
	user: User = new User( null, null, null, null, null, null, null, null, null, null, null, null );
	bicycle: Bicycle = new Bicycle();
	states: String[] = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA',
						'ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NJ','NM','NY','NC','ND','OH',
						'OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','AS','GU','MH','FM',
						'MP','PW','PR','VI'];
	
	preview: any = null;
	file: any = null;
	errors: any = {};

	constructor(private _authenticationService: AuthenticationService, private _bicycleService: BicycleService, private _route: ActivatedRoute, private _router: Router) { }

	ngOnInit() {
		this._authenticationService.getLoggedInUser().subscribe( success => this.user = success['user'] );
	}
  
	previewImage(e: any){

		const file: any = e.target.files[0] //sames as here
		const reader: any = new FileReader();
		this.errors.image = null;
		
		if (file) {
			
			if(!file.type.startsWith('image')) { this.errors = {image:`Invalid file type "${file.type}" selected, must be of type image.`}; return; }
			reader.onloadend = () => {
				this.preview = document.querySelector('#image'); //selects the query named img
				this.preview.src = reader.result;
			}
			reader.readAsDataURL(file);
			
			this.file = file; 
		}//reads the data as a URL
		else this.preview.src = this.preview.src == null ? "" : this.preview.src;
	}

	checkState(location: string): String{
		const regex: RegExp = new RegExp('^[a-zA-Z ]{3,45}, ?[a-zA-Z]{2}$');

		if (regex.test(location)) return this.states.find( state => { return state == location.split(/^[a-zA-Z ]{3,45}, ?([a-zA-Z]{2})$/)[1].toUpperCase() ? true : false; });
		else return null;
	}

	create(bicycle: Bicycle): void{
		
		this.uploader.queue = this.uploader.queue.filter( (e,i) => i === this.uploader.queue.length-1 ); //If multiple images were selected and added to the queue, only keep last image in queue. 
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			 //console.log('ImageUpload:uploaded:', item, status, response);
			 //alert('File uploaded successfully');
			 bicycle.user_id = this.user._id;
			 bicycle.image = JSON.parse(response).image;
			 this._bicycleService.create(bicycle);
		 };
		
		this.uploader.uploadAll();
		
		this.bicycle = new Bicycle();
		$('img').attr('src', null);
	}
}
