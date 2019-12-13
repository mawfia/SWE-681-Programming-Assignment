import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { User } from '../../../user';
import { Bicycle } from '../../../bicycle';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../../services/authentication.service";
import { BicycleService } from "../../../services/bicycle.service";

@Component({
  selector: 'app-my-bicycles-list',
  templateUrl: './my-bicycles-list.component.html',
  styleUrls: ['../my-bicycles.component.css']
})
export class MyBicyclesListComponent implements OnInit {
		
	@Input() states: string[];
	
	public uploader: FileUploader = new FileUploader({url: '/image/update', itemAlias: 'image'});
	URL: string = "http://localhost:5000/image/";
	
	user: User = new User();
	bicycle: Bicycle = new Bicycle();
	my_bicycles: Bicycle[] = [];
	bicycles: Bicycle[] = [];
	
	preview: any = null;
	file: any = null;
	errors: any = {};

	constructor(private _authenticationService: AuthenticationService, private _bicycleService: BicycleService, private _route: ActivatedRoute, private _router: Router) { }

	ngOnInit() {
	
		this._authenticationService.getLoggedInUser().subscribe( success => { 
			this.user = success['user']; 
				
			this._bicycleService.bicyclesObservers.subscribe(
			(bicycles: Bicycle[]) => { this.bicycles = bicycles; this.getMyBicyclesList(); });			
		});
		
	}
	
	previewImage(e: any, id: number, bicycle: Bicycle): void{
		this.preview = document.querySelector(`#bicycle${id}`); //selects the query named img
		const file = e.target.files[0] //sames as here
		const reader  = new FileReader();
		this.errors.image = null;	   
		
		//console.log(bicycle);
		
		if (file) {
			if(!file.type.startsWith('image')) { this.errors = {image:`Invalid file type "${file.type}" selected, must be of type image.`, image_id: id}; return; }
				
			reader.onloadend = () => {
				this.preview.src = reader.result;
			}
			reader.readAsDataURL(file); 
			this.file = file; 
		}//reads the data as a URL
		else this.preview.src = this.preview.src == null ? "" : this.preview.src;
	}
	
	
	checkState(location: string): string{
		const regex = new RegExp('^[a-zA-Z]{3,45}, ?[a-zA-Z]{2}$');

		if (regex.test(location)) return this.states.find( state => { return state == location.split(/^[a-zA-Z]{3,45}, ?([a-zA-Z]{2})$/)[1].toUpperCase() ? true : false; });
		else return null;
	}
	
	getMyBicyclesList(): void{
		
		this.my_bicycles = this.bicycles.filter( bicycle => bicycle.user_id == this.user._id );	
	}
	
	// Check if image has changed, if not update bicycle.  If image has changed, first save old image filename, update image, then save bicycle
	update(bicycle: Bicycle, id: string, image: string): void{
		
		bicycle._id = id; bicycle.user_id = this.user._id;
		if(!bicycle.image){
			bicycle.image = image;
			this.save(bicycle);
		}
		else{
			this.uploader.queue = this.uploader.queue.filter( (e,i) => i === this.uploader.queue.length-1 ); 
			this.uploader.queue[0].file.name = image; // Add original image filename to request for update on backend
			console.log(this.uploader.queue[0]);
			this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
			this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

				//alert('Listing updated successfully');
				 bicycle.image = JSON.parse(response).image;
				 this.save(bicycle);
			 }
			 
			 this.uploader.uploadAll();
		}
	}
	
	save(bicycle: Bicycle): void{
		this._bicycleService.update(bicycle).subscribe(
				result => { 
					if(result['message'] == 'success') { this.getMyBicyclesList(); }
					else this.errors = result['errors'];
			}); 
	}
}