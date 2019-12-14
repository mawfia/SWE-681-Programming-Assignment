import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { User } from '../../user';
import { Bicycle } from '../../bicycle';
import { of, Observable, from, BehaviorSubject, Observer, Subscription, timer } from 'rxjs';
import { map, concatMap, take, filter, mergeMap, toArray } from 'rxjs/operators'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { BicycleService } from "../../services/bicycle.service";
import { SocketService } from "../../services/socket.service";

@Component({
  selector: 'app-my-bicycles',
  templateUrl: './my-bicycles.component.html',
  styleUrls: ['./my-bicycles.component.css']
})
export class MyBicyclesComponent implements OnInit, OnDestroy {

	public uploader: FileUploader = new FileUploader({url: '/image/create', authToken: localStorage.getItem('token'), itemAlias: 'image'});

	user: User = new User();
	bicycle: Bicycle = new Bicycle();
  bicycles: Bicycle[] = [];
	states: String[] = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA',
						'ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NJ','NM','NY','NC','ND','OH',
						'OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','AS','GU','MH','FM',
						'MP','PW','PR','VI'];

	preview: any = null;
	file: any = null;
	errors: any = {};
  subscription1: Subscription;
  subscription2: Subscription;

	constructor(private _authenticationService: AuthenticationService, private _bicycleService: BicycleService,
              private _route: ActivatedRoute, private _router: Router, private _socket: SocketService) { }

	ngOnInit() {

    $('body').css({'background-image':'url(assets/stonewall9.jpg)'});

    this.subscription2 = this._socket.getMessages().subscribe( result => { this._bicycleService.index(); console.log(result); });

	     this._authenticationService.getLoggedInUser().subscribe( success => {

          this.user = success['user'];
          $('title').text(`Bicycle Marketplace | ${this.user.first_name}'s Bicycles`);

          this.subscription1 = this._bicycleService.bicyclesObservers.subscribe( (bicycles: Bicycle[]) => {
              this.bicycles = bicycles;
          });

        });
	}

  ngOnDestroy(){
    this.subscription2.unsubscribe();
    //this.subscription1.unsubscribe();
  }

	previewImage(e: any){
    this.preview = $('#image')[0];
		const file: any = e.target.files[0]; //sames as here
		const reader: FileReader = new FileReader();
		this.errors.image = null;
    this.file = file;

		if(file && !file.type.startsWith('image')) { this.errors = {image:`Invalid file type "${file.type}" selected, must be of type image.`}; return; }
    else if(!file) return;
		reader.onloadend = () => { this.preview.src = reader.result; $('.btn').hide(); }
		reader.readAsDataURL(file);
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
			 bicycle.seller_id = this.user._id;
       bicycle.status = 'inactive';
			 bicycle.image = JSON.parse(response).image;
			 this._bicycleService.create(bicycle).subscribe( result => {
         if(result['message'] == 'Error') { this._bicycleService.cancel(bicycle.image); this.errors = result['errors']; }
         else this._bicycleService.index();
       });
		 };
		this.uploader.uploadAll();
    $('.btn').show();
    this.bicycle = new Bicycle();
    $('img').attr('src', "");
	}
}
