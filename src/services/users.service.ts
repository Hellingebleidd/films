import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'http://localhost:8080/'

  //lokalni userovia
  private users = [
    new User("ZuzankaS", "zuzanka@z.sk", 1, new Date("2022-02-24"), 'heslo'),
    new User(" AnickaS", "anicka@sk.sk", 2),
    new User("EliotS", "-", 13),
    new User("EskelS", "-", 4)
  ]

  private token = ''

  constructor(private http: HttpClient, 
              private messageService: SnackbarService) { }

  //synchronne
  public getLocalUsersSyn(): User[] {
    return this.users
  }

  //asynchronne
  public getLocalUsers(): Observable<User[]> {
    return of(this.users)
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users').pipe(
      map(jsonArray => jsonArray.map(jsonUser => User.clone(jsonUser)))
    )
  }

  public login(auth: Auth): Observable<boolean> {
    //vezme telo a vrati mi ho ako string
    return this.http.post(this.url + 'login', auth, { responseType: 'text' }).pipe(
      map(token=>{
        this.token=token
        this.messageService.successMessage("user "+auth.name+"logged in  successfully ")
        return true
      }),
      catchError(error => {
        if(error instanceof HttpErrorResponse){
          if(error.status==0)  this.messageService.errorMessage("server uavailible")
          if(error.status == 401) this.messageService.errorMessage("Incorrect password or username")          
        }
        //??????
        return of(false)
      })
    )
  }


}
