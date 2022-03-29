import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectingPreloadingService implements PreloadingStrategy {

  constructor() { }
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      console.log("preloading on background", route.path)
      return load()
    }
    console.log("NOT preloading on background", route.path)
    return of(null)
  }
}
