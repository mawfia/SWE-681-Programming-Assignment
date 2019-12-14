import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../user';
import { Bicycle } from '../../bicycle';
import { of, Observable, from, BehaviorSubject, Observer, Subscription, timer  } from 'rxjs';
import { map, concatMap, take, filter, mergeMap, toArray } from 'rxjs/operators'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";
import { BicycleService } from "../../services/bicycle.service";
import { SocketService } from "../../services/socket.service";

@Component({
  selector: 'app-bicycles',
  templateUrl: './bicycles.component.html',
  styleUrls: ['./bicycles.component.css']
})
export class BicyclesComponent implements OnInit, OnDestroy {

  user: User = new User();
  bicycles: Bicycle[] = [];
  isLoading: boolean = true;
  URL: string = this._socket.URL;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;

  constructor(private _authenticationService: AuthenticationService, private _bicycleService: BicycleService,
              private _route: ActivatedRoute, private _router: Router, private _socket: SocketService) { }

  ngOnInit() {
    this.isLoading = true;
    $('body').css({'background-image':'url(assets/stonewall1.jpg)'});
    $('title').text(`Bicycle Marketplace | Bicycles`);

    this.subscription3 = this._socket.getMessages().subscribe( result => { this._bicycleService.index(); });

     this._authenticationService.getLoggedInUser().subscribe( success => { this.user = success['user']; });

     this.subscription = this._bicycleService.bicyclesObservers.subscribe(
     (bicycles: Bicycle[]) => {
       this.bicycles = bicycles.filter( b => b.status === 'active' ); this.isLoading = false;
     });
  }

  ngOnDestroy(){
    this.subscription3.unsubscribe();
  }

}
