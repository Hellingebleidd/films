import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [
    new User("Zuzanka", "zuzanka@z.sk", 1, new Date("2022-02-24"), 'heslo'),
    new User(" Anicka", "anicka@sk.sk", 2),
    new User("Eliot", "-", 13),
    new User("Eskel", "-", 4)
  ]
  selectedUser: User | undefined = undefined
  columnsToDisplay = ['id','name', 'email']

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    // this.users = this.usersService.getLocalUsersSyn()
    // this.usersService.getLocalUsers().subscribe(u => this.users = u)
    this.usersService.getUsers().subscribe(u => {
      console.log('users from server: ', u)
      this.users = u
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

}
