import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user';

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

  constructor(private http: HttpClient) { }

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
        return true
      }),
      catchError(error => {
        //??????
        return of(false)
      })
    )
  }


}
