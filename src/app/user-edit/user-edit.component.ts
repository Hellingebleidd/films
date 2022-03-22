import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userid = 0
  user: User = new User('', '')

  constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    //snapshot je pri vytvarani
    // this.userid = +this.route.snapshot.params['id'] //+ konvertuje string na cislo lol
    // this.userService.getUserById(this.userid).subscribe(u => this.user = u)
    this.route.paramMap.pipe(
      map(paramMap => {
        this.userid = +(paramMap.get('id') || -1)
        return this.userid
      }),
      mergeMap(id => this.userService.getUserById(id))
    ).subscribe(u => this.user = u)
  }

  userSaved(user: User){
    this.user = user;
    this.router.navigateByUrl("/extended-users")
  }

}
