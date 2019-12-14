import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { User } from '../../../user';
import { Bicycle } from '../../../bicycle';
import { BicycleService } from "../../../services/bicycle.service";
import { SocketService } from "../../../services/socket.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-my-acquisition-bicycles-list',
  templateUrl: './my-acquisition-bicycles-list.component.html',
  styleUrls: ['../my-bicycles.component.css']
})
export class MyAcquisitionBicyclesListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user: User;
  @Input() bicycles: Bicycle[] = [];
  @Input() isLoading: boolean = true;

  acquisition_bicycles: Bicycle[] = [];

  subscription: Subscription;

  URL: string = this._socket.URL;

  constructor(private _bicycleService: BicycleService, private _authenticationService: AuthenticationService, private _socket: SocketService) { }

  ngOnInit() { this.isLoading = true; }

  ngOnChanges(changes: SimpleChanges){
    if (changes) { if (this.bicycles.length > 0) { this.acquisitionBicyclesList(); } this.isLoading = false; }
  }

  ngOnDestroy(){
  }

  acquisitionBicyclesList(): void{
    let ids: string[] = [];

		this.acquisition_bicycles = this.bicycles.filter( bicycle => bicycle.buyer_id === this.user._id && bicycle.status === 'accession');
    this.acquisition_bicycles.forEach( b => ids.push(b.seller_id) );

    this._authenticationService.getSellersName(ids).
      subscribe( result => {

          this.acquisition_bicycles.
              forEach( (bicycle, i) => {
                bicycle.seller = result.docs.find( seller => seller._id == bicycle.seller_id);
              });
      });
	}

}
