import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { User } from '../../../user';
import { Bicycle } from '../../../bicycle';
import { BicycleService } from "../../../services/bicycle.service";
import { SocketService } from "../../../services/socket.service";
import { of, Observable, from, BehaviorSubject, Observer, Subscription, timer } from 'rxjs';
import { map, concatMap, take, filter, mergeMap, toArray } from 'rxjs/operators'

@Component({
  selector: 'app-my-active-bicycles-list',
  templateUrl: './my-active-bicycles-list.component.html',
  styleUrls: ['../my-bicycles.component.css']
})
export class MyActiveBicyclesListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() user: User;
  @Input() bicycles: Bicycle[] = [];
  @Input() isLoading: boolean = true;

  active_bicycles: Bicycle[] = [];
  subscription: Subscription;
  errors: any = null;

  URL: string = this._socket.URL;

  constructor(private _bicycleService: BicycleService, private _socket: SocketService) { }

  ngOnInit() { this.isLoading = true; }

  ngOnChanges(changes: SimpleChanges){
    if(changes) { this.activeBicyclesList(); this.isLoading = false; }
    //if(changes['user'] || changes['bicycles') this.activeBicyclesList();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  activeBicyclesList(): void{

		this.active_bicycles = this.bicycles.filter( bicycle => bicycle.seller_id === this.user._id && bicycle.status === 'active' );

    this.subscription = timer(0, 2000).pipe(mergeMap( () => of(this.active_bicycles))).subscribe( b2 => b2.forEach(b4 => b4.remaining = +new Date(b4.close_date) - +new Date()));
	}

  cancel(bicycle: Bicycle, form_id: number, bicycle_id: string):void{

    this._bicycleService.index();
    this.activeBicyclesList();
  }

  update(bicycle: Bicycle, bicycle_id: number, form_id: number): void{
    this.errors = {};
    bicycle._id = bicycle_id;

		this._bicycleService.update(bicycle).subscribe(
				result => {
					if(result['message'] == 'Success') { this.activeBicyclesList(); this._socket.sendMessage('activate'); }
					else {
            this.errors = result['errors'];
            this.errors.id = form_id;
          }
			});
	}

}
