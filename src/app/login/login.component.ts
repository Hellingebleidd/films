import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth = new Auth("Lucia","lucia")
  hide = true
  errorMessage = ''

  //private => userservice sa stava instancnou premennou
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  getAuth(): string {
    return JSON.stringify(this.auth)
  }

  onSubmit() {
    //subscribe na zachytnu funkciu aby data nevypadavli prec
    this.usersService.login(this.auth).subscribe(
      {
        next: success => {
          if (success) {
            console.log("login successful")
            this.errorMessage = ''
          } else {
            this.errorMessage = "incorrect password or username"
          }
        }
      })
  }
}
