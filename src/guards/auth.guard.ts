import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from 'src/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UsersService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    console.log('canLoad authGuard: guarding url ' + route.path)
    return this.canAnything(route.path || '')
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('canActivate AuthGuard: guarding url ' + state.url)
    return this.canAnything(state.url)
  }

  canAnything(url: string): Observable<boolean> | boolean {
    if (this.userService.isLoggedIn()) return true

    this.userService.redirectAfterLogin = url
    this.router.navigateByUrl('/login')
    return false
  }

}
