import { Component, OnInit, OnDestroy  } from '@angular/core';
import { User } from '../../user';
import { Bicycle } from '../../bicycle';
import { of, Observable, from, BehaviorSubject, Observer, Subscription, timer } from 'rxjs';
import { map, concatMap, take, filter, mergeMap, toArray, takeWhile } from 'rxjs/operators'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { BicycleService } from "../../services/bicycle.service";
import { SocketService } from "../../services/socket.service";

@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.component.html',
  styleUrls: ['./bicycle.component.css']
})
export class BicycleComponent implements OnInit, OnDestroy {

  user: User = new User();
  URL: string = this._socket.URL;
  bicycle: Bicycle = new Bicycle();
  error: any = null;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  isLoading: boolean = true;
  update: Bicycle = new Bicycle();

  constructor(private _authenticationService: AuthenticationService, private _bicycleService: BicycleService,
              private _route: ActivatedRoute, private _router: Router, private _socket: SocketService) { }

  ngOnInit() {
    $('body').css({'background-image':'url(assets/stonewall3.jpg)'}); this.isLoading = true;

    this.subscription1 = this._socket.getMessages().subscribe( result => { this._bicycleService.index(); this._bicycleService.get2(this.bicycle._id); });

       this._authenticationService.getLoggedInUser().subscribe( success => { this.user = success['user'];  } );

       this._bicycleService.bicycleObservers.subscribe(  (bicycle: Bicycle) => {
          this.bicycle = bicycle;
          //console.log(bicycle);
          this.bicycle.remaining = 1;

          this.update.bid_amount = this.bicycle.bid_amount > this.bicycle.start_price ? this.bicycle.bid_amount : this.bicycle.start_price;
          $('title').text(`Bicycle | ${this.bicycle.title}`); this.isLoading = false;

          this.subscription3 = timer(0, 1000).
           pipe(takeWhile( () => this.bicycle.remaining > 0  )).
           pipe(mergeMap( () => of(this.bicycle))).
             subscribe( b => {
               b.remaining = +new Date(b.close_date) - +new Date();
               if(b.remaining < 0) this._router.navigate(['/bicycles']);
          });
        });

  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    //this.subscription2.unsubscribe();
    //this.subscription4.unsubscribe();
    this.subscription3.unsubscribe();

  }

  bid(update: Bicycle): void{
    this.error = null;
    update._id = this.bicycle._id;
    update.buyer_id = this.user._id;
    update.bid_date = new Date().toJSON();

    this._bicycleService.update(update).subscribe(
        result => {
          if(result['message'] == 'Error') {
            this.error = result['errors'];
            this._bicycleService.get2(this.bicycle._id);
          }
          else {
              this._bicycleService.get2(this.bicycle._id);
              this._socket.sendMessage('bid', {bicycle: this.bicycle, bid: update});
          }
      });
  }

}
