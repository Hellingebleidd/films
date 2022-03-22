import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Group } from 'src/entities/group';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-user-edit-child',
  templateUrl: './user-edit-child.component.html',
  styleUrls: ['./user-edit-child.component.css']
})
export class UserEditChildComponent implements OnChanges {

  @Input() user: User | undefined
  @Output() saved = new EventEmitter<User>()

  hide = true
  editForm = new FormGroup({
    name: new FormControl('',
      [Validators.required, Validators.minLength(4)], this.serverConflictValidator('name')),
    email: new FormControl('',
      [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$")], this.serverConflictValidator('email')),
    password: new FormControl('',),
    active: new FormControl(true),
    groups: new FormArray([])
    
  })
  allGroups: Group[] = []
  title=''

  constructor(private usersService: UsersService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.title = (this.user.id)? 'EDIT USER' : 'ADD USER'
      this.name.setValue(this.user.name)
      this.email.setValue(this.user.email)
      this.active.setValue(this.user.active)

      this.usersService.getGroups().subscribe(groups => {
        this.groups.clear()
        this.allGroups = groups
        for (let g of groups) {
          if (this.user?.groups.some(ug => g.id === ug.id)) {
            this.groups.push(new FormControl(true))
          } else {
            this.groups.push(new FormControl(false))
          }
        }
      })
    }
  }

  onSubmit() {
    const paswd = (this.password.value as string).trim()
    let groups : Group[] = []
    for(let i=0; i<this.allGroups.length; i++){
      if(this.groups.at(i).value == true){
        groups.push(this.allGroups[i]);
      }
    }
    const userToSave = new User(
      this.name.value,
      this.email.value,
      this.user?.id,
      this.user?.lastLogin,
      paswd ? paswd : undefined,
      this.active.value,
      groups
    )
    this.usersService.saveUser(userToSave).subscribe(savedUser =>{
      this.saved.emit(savedUser)
    })
  }

  get name(): FormControl {
    return this.editForm.get('name') as FormControl
  }
  get email(): FormControl {
    return this.editForm.get('email') as FormControl
  }
  get password(): FormControl {
    return this.editForm.get('password') as FormControl
  }
  get active(): FormControl {
    return this.editForm.get('active') as FormControl
  }
  get groups(): FormArray {
    return this.editForm.get('groups') as FormArray
  }


  stringify(error: any): string {
    return JSON.stringify(error)
  }

  serverConflictValidator(field: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = field === "name" ? control.value : ''
      const email = field === "email" ? control.value : ''
      const user = new User(name, email, this.user?.id)
      return this.usersService.userConflicts(user).pipe(
        map(conflictsArray => conflictsArray.includes(field) ? {
          conflict: 'already exists'
        } : null)
      )
    }
  }


}
