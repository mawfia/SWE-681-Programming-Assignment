import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { BicycleService } from './bicycle.service';
import { Bicycle } from '../bicycle';

@Injectable({
  providedIn: 'root'
})
export class BicycleDetailResolverService implements Resolve<Bicycle> {

  constructor(private _bicycleService: BicycleService, private _router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Bicycle> | Observable<never> {
    let id = route.paramMap.get('id');
    return this._bicycleService.get2(id).pipe(
      take(1),
      mergeMap(bicycle => {
        if (bicycle) {
          return of(bicycle);
        } else { // id not found
          this._router.navigate(['/bicycles']);
          return EMPTY;
        }
      })
    );
  }

}
