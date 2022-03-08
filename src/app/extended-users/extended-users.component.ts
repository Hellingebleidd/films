import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit {

  columnsToDisplay = ['id','name', 'email', 'active', 'lastLogin', 'groups', 'permissions']
  users: User[] = []

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getExtendedUsers().subscribe(u=>{
      this.users=u
      console.log(u)
    })
  }

}
