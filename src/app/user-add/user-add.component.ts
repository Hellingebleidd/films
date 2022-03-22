import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/entities/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user = new User('','')
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  userSaved(){
    this.router.navigateByUrl("/extended-users")
  }

}
