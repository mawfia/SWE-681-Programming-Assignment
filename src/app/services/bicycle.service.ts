import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Bicycle } from '../bicycle';
import { Image } from '../image';
import { CookieService } from 'ngx-cookie';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {
	bicyclesObservers: BehaviorSubject<any[]> = new BehaviorSubject([]);
	
	constructor(private _http: HttpClient, private _cookieService: CookieService) {
		this.index();
	}
	
	index(): void{
		this._http.get<Bicycle>('/bicycles/index').subscribe(
			(observer) => { this.bicyclesObservers.next(observer['bicycles']); }
		);
	}

	create(bicycle: Bicycle): void{
		//console.log(bicycle.image);
		this._http.post<Bicycle>('/bicycle/create', bicycle).subscribe( success => { this.index(); } );
		
	}
	
	update(bicycle: Bicycle): Observable<any>{
		
		let observable = this._http.put<Bicycle>('/bicycle/update/', bicycle);
		
		observable.subscribe( result => { result['message'] == 'success'; this.index(); });
		
		return observable;
	}
}