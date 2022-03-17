import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-edit-child',
  templateUrl: './user-edit-child.component.html',
  styleUrls: ['./user-edit-child.component.css']
})
export class UserEditChildComponent implements OnInit {

  hide = true
  editForm = new FormGroup({
    name: new FormControl('',
      [Validators.required, Validators.minLength(4)],
      this.serverConflictValidator('name')),
    email: new FormControl('',
      [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$")],
      this.serverConflictValidator('email')),
    password: new FormControl('',),

  })

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  get name(): FormControl{
    return this.editForm.get('name') as FormControl
  }
  get email(): FormControl{
    return this.editForm.get('email') as FormControl
  }
  get password(): FormControl{
    return this.editForm.get('password') as FormControl
  }

  stringify(error:any): string{
    return JSON.stringify(error)
  }

  serverConflictValidator(field: string): AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = field === "name" ? control.value : ''
      const email = field === "email" ? control.value : ''
      const user  = new User(name, email)
      return this.usersService.userConflicts(user).pipe(
        map(conflictsArray => conflictsArray.includes(field) ? {
          conflict: 'already exists'
        } : null)
      )
    }
  }

  onSubmit() { }

}
