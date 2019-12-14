import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { User } from '../../../user';
import { Bicycle } from '../../../bicycle';
import { BicycleService } from "../../../services/bicycle.service";
import { SocketService } from "../../../services/socket.service";

@Component({
  selector: 'app-my-inactive-bicycles-list',
  templateUrl: './my-inactive-bicycles-list.component.html',
  styleUrls: ['../my-bicycles.component.css']
})
export class MyInactiveBicyclesListComponent implements OnInit, OnChanges {

	@Input() states: string[];
  @Input() user: User;
  @Input() bicycles: Bicycle[];
  @Input() isLoading: boolean = false;

	public uploader: FileUploader = new FileUploader({url: '/image/update', authToken: localStorage.getItem('token'), itemAlias: 'image'});
	URL: string = this._socket.URL;

	bicycle: Bicycle = new Bicycle();
	inactive_bicycles: Bicycle[] = [];
	preview: any = null;
	file: any = null;
	errors: any = {};

	constructor(private _bicycleService: BicycleService, private _socket: SocketService) { }

	ngOnInit() { this.isLoading = true; }

  ngOnChanges(changes: SimpleChanges){
    if(changes) { this.inactiveBicyclesList(); this.isLoading = false; }
  }

	previewImage(e: any, id: number, bicycle: Bicycle): void{
		//this.preview = document.querySelector(`#bicycle${id}`); //selects the query named img
    this.preview = $(`#bicycle${id}`)[0];
		const file: any = e.target.files[0] //sames as here
		const reader: FileReader  = new FileReader();
		this.errors.image = null;

		// (file) {
		if(file && !file.type.startsWith('image')) { this.errors = {image:`Invalid file type "${file.type}" selected, must be of type image.`, image_id: id};  return; }
    else if(!file) return;

		reader.onloadend = () => this.preview.src = reader.result; // attach event onloadend for file
		reader.readAsDataURL(file); //reads the data as a URL
		this.file = file;
		//}
		//else
    this.preview.src = this.preview.src == null ? `${URL}${this.bicycle.image}` : this.preview.src;
	}


	checkState(location: string): string{
		const regex: RegExp = new RegExp('^[a-zA-Z]{3,45}, ?[a-zA-Z]{2}$');

		if (regex.test(location)) return this.states.find( state => { return state == location.split(/^[a-zA-Z]{3,45}, ?([a-zA-Z]{2})$/)[1].toUpperCase() ? true : false; });
		else return null;
	}

	inactiveBicyclesList(): void{

		this.inactive_bicycles = this.bicycles.filter( bicycle => bicycle.seller_id === this.user._id && bicycle.status === 'inactive' );
	}

	// Check if image has changed, if not update bicycle.  If image has changed, first save old image filename, update image, then save bicycle
	update(bicycle: Bicycle, id: string, image: string, form_id: number): void{

		bicycle._id = id;
    bicycle.seller_id = this.user._id;
		if(!bicycle.image){
			bicycle.image = image;
			this.save(bicycle, form_id);
		}
		else{
			this.uploader.queue = this.uploader.queue.filter( (e,i) => i === this.uploader.queue.length-1 );
			this.uploader.queue[0].file.name = image; // Add original image filename to request for update on backend
			//console.log(this.uploader.queue[0]);
			this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
			this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

				//alert('Listing updated successfully');
				 bicycle.image = JSON.parse(response).image;
				 this.save(bicycle, form_id);
			 }

			 this.uploader.uploadAll();
		}
	}

  cancel(form_id: number, bicycle_id: string):void{

    this._bicycleService.index();
    this.inactiveBicyclesList();

  }

  convertDate(date: any, bicycle: Bicycle, id: number): void{
    bicycle.close_date = new Date(date.target.value).toJSON();
  }

  activate(bicycle: Bicycle, bicycle_id: string, id: number): void{

    let update: Bicycle = new Bicycle(bicycle._id);
    update.close_date = bicycle.close_date;
    update.status = "active";
    this.save(update, id);
    //this._socket.sendMessage('activate');
  }

	save(bicycle: Bicycle, id: number): void{
    this.errors = {};

		this._bicycleService.update(bicycle).subscribe(
				result => {
					if(result['message'] == 'Success') { this.inactiveBicyclesList(); this._socket.sendMessage('activate'); }
					else {
            this.errors = result['errors'];
            this.errors.id = id;
            bicycle.status = "inactive";
            console.log(this.errors);
          }
			});
	}

  delete(bicycle: Bicycle): void{
    //console.log(id);
    this._bicycleService.delete(bicycle);
  }


}
