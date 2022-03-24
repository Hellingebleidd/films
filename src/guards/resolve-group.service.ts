//SERVICE
//na rozdiel od guarda co hned zomrie, service podrzi data a zije dlho a je to singleton
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/entities/group';
import { UsersService } from 'src/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class ResolveGroupService implements Resolve<Group>{

  constructor(private usersService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Group | Observable<Group>{
    console.log('resolve group guard for id '+ route.params['id'])
    return this.usersService.getGroup(+route.params['id']) //menim na cislo cez +
  }
}
