import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { RegisterComponent } from './register/register.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'extended-users', component: ExtendedUsersComponent },
  { path: 'users/edit/:id', component: UserEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: P404Component }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
