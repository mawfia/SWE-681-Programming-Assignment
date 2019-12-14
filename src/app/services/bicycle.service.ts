import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Bicycle } from '../bicycle';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {
	bicyclesObservers: BehaviorSubject<any[]> = new BehaviorSubject([]);
  bicycleObservers: BehaviorSubject<any> = new BehaviorSubject({});

	constructor(private _http: HttpClient) {
		this.index();
	}

	index(): void{
		this._http.post<Bicycle>('/bicycles/index', null).subscribe(
			(observer) => { this.bicyclesObservers.next(observer['bicycles']); }
		);
	}

  get1(id: string): any{

    return this._http.post<Bicycle>(`/bicycle/get`, {id: id});
  }

  get2(id: string): Observable<any>{

    let observable = this._http.post<Bicycle>(`/bicycle/get`, {id: id});

    observable.subscribe(
      (observer) => { this.bicycleObservers.next(observer['bicycle']); }
    );


    return observable;

  }

	create(bicycle: Bicycle): Observable<any>{


    return this._http.post<Bicycle>('/bicycles/create', bicycle);
	}

  delete(bicycle: Bicycle): void{
    this._http.post<any>('/bicycles/delete', bicycle).subscribe( result => {
      if(result['message'] == 'Success') this.index();
    });
  }

  cancel(image: string): void{
    this._http.post<any>('/image/delete', {image:image}).subscribe( result => {  });
  }

	update(bicycle: Bicycle): Observable<any>{

		let observable = this._http.put<Bicycle>('/bicycles/update/', bicycle);

		observable.subscribe( result => { if(result['message'] == 'Success') {this.index(); } });

		return observable;
	}
}
