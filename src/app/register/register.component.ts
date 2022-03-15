import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true

  registerForm = new FormGroup({
    name: new FormControl('pstruhanka', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password2: new FormControl(''),
  })
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

  onSubmit(){
    
  }
}
