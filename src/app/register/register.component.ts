import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from 'src/entities/user';
import { CanDeactivateComponent } from 'src/guards/can-deactivate.guard';
import { DialogService } from 'src/services/dialog.service';
import { UsersService } from 'src/services/users.service';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, CanDeactivateComponent {
  hide = true

  passwordMessage = ''

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const result = zxcvbn(control.value)
    const message = "password strength: "+result.score + "/4  --"+" can be guessed in "+result.crack_times_display.offline_slow_hashing_1e4_per_second
    this.passwordMessage = message
    return result.score < 3 ? {weakPassword: message} : null
  }

  registerForm = new FormGroup({
    name: new FormControl('pstruhanka', 
                          [Validators.required, Validators.minLength(4)], 
                          this.serverConflictValidator('name')),
    email: new FormControl('', 
                          [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$")],
                          this.serverConflictValidator('email')),
    password: new FormControl('', this.passwordValidator),
    password2: new FormControl(''),
  }, this.passwordMatchValidator)

  constructor(private usersService: UsersService, private router: Router, private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  get name(): FormControl{
    return this.registerForm.get('name') as FormControl
  }
  get email(): FormControl{
    return this.registerForm.get('email') as FormControl
  }
  get password(): FormControl{
    return this.registerForm.get('password') as FormControl
  }
  get password2(): FormControl{
    return this.registerForm.get('password2') as FormControl
  }

  stringify(error:any): string{
    return JSON.stringify(error)
  }

  passwordMatchValidator(formModel: AbstractControl): ValidationErrors | null {
    const pass1 = formModel.get('password')
    const pass2 = formModel.get('password2')

    if(pass1?.value === pass2?.value){
      pass2?.setErrors(null)
      return null
    }
    const err = {differentPasswd: "Passwords are not same"}
    pass2?.setErrors(err)
    return err
  }

  //asynchronny validator
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

  onSubmit(){
    const userToSave = new User(
      this.name.value,
      this.email.value,
      undefined,
      undefined,
      this.password.value,
      true
    )
    this.usersService.registerUser(userToSave).subscribe(saved =>{
      this.router.navigateByUrl("/login")
    })
  }

  canDeactivate(): boolean | Observable<boolean>{
    if(this.name.dirty || this.email.dirty){
      return this.dialogService.confirm('registration not finnished', 'do you want to leave the page?')
    }
    return true
  }
}
