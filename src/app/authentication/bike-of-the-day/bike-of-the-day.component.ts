import { Component, OnInit } from '@angular/core';
import { of, Observable, from, BehaviorSubject, Observer } from 'rxjs';
import { BicycleService } from "../../services/bicycle.service";
import { SocketService } from "../../services/socket.service";
import { Bicycle } from '../../bicycle';

@Component({
  selector: 'app-bike-of-the-day',
  templateUrl: './bike-of-the-day.component.html',
  styleUrls: ['../authentication.component.css']
})
export class BikeOfTheDayComponent implements OnInit {

  bike_of_the_day: Bicycle = new Bicycle();
  active: Bicycle[] = [];
  URL: string = this._socket.URL;
  isLoading: boolean = true;

  constructor(private _bicycleService: BicycleService, private _socket: SocketService) { }

  ngOnInit() {
    this.isLoading = true;
    this._bicycleService.bicyclesObservers.subscribe(
    (bicycles: Bicycle[]) => {
      this.active = bicycles.filter( b => b.status === 'active');
      this.bike_of_the_day = this.active[Math.floor(this.active.length*Math.random())];
      this.isLoading = false;
    });

  }

}
