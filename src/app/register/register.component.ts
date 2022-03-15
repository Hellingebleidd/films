import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import * as zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true

  passwordMessage = ''

  passwordValidator = (control: AbstractControl): ValidationErrors | null => {
    const result = zxcvbn(control.value)
    const message = "password strength: "+result.score + "/4  --"+" can be guessed in "+result.crack_times_display.offline_slow_hashing_1e4_per_second
    this.passwordMessage = message
    return result.score < 3 ? {weakPassword: message} : null
  }

  registerForm = new FormGroup({
    name: new FormControl('pstruhanka', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$")]),
    password: new FormControl('', this.passwordValidator),
    password2: new FormControl(''),
  }, this.passwordMatchValidator)
  constructor() { }

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

  onSubmit(){
    
  }
}
