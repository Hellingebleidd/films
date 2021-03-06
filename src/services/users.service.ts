import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, Subscriber, tap } from 'rxjs';
import { Auth } from 'src/entities/auth';
import { Group } from 'src/entities/group';
import { User } from 'src/entities/user';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';

export const DEFAULT_REDIRECT_URL = '/extended-users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = environment.restServer
  private loggedUserSubscriber: Subscriber<string | null> | undefined
  public redirectAfterLogin = DEFAULT_REDIRECT_URL
  //lokalni userovia
  private users = [
    new User("ZuzankaS", "zuzanka@z.sk", 1, new Date("2022-02-24"), 'heslo'),
    new User(" AnickaS", "anicka@sk.sk", 2),
    new User("EliotS", "-", 13),
    new User("EskelS", "-", 4)
  ]

  constructor(private http: HttpClient,
    private messageService: SnackbarService,
    private router: Router) { }

  //vyrabam lokalnu inst. premennu token
  public get token() {
    return localStorage.getItem('token')
  }
  private set token(value: string | null) {
    if (value === null) {
      localStorage.removeItem('token')
    } else {
      localStorage.setItem('token', value);
    }
  }

  //vyrabam lokalnu inst. premennu username
  private get username() {
    return localStorage.getItem('username')
  }
  private set username(value: string | null) {
    if (value === null) {
      localStorage.removeItem('username')
    } else {
      localStorage.setItem('username', value);
    }
  }

  public isLoggedIn(): boolean {
    return !!this.token
  }

  public loggedUser(): Observable<string | null> {
    return new Observable(subscriber => {
      this.loggedUserSubscriber = subscriber
      this.loggedUserSubscriber.next(this.username)
    })
  }

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
      map(jsonArray => jsonArray.map(jsonUser => User.clone(jsonUser))),
      catchError(error => this.processHttpError(error))
    )
  }

  public getExtendedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users/' + this.token).pipe(
      map(jsonArray => jsonArray.map(jsonUser => User.clone(jsonUser))),
      catchError(error => this.processHttpError(error))
    )
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + 'user/' + id + '/' + this.token).pipe(
      map(jsonUser => User.clone(jsonUser)),
      catchError(error => this.processHttpError(error))
    )
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(this.url + 'user/' + userId + '/' + this.token).pipe(
      tap(() => {
        this.messageService.successMessage('user successfully deleted')
      }),
      catchError(error => this.processHttpError(error))
    )
  }

  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups').pipe(
      map(jsonArray => jsonArray.map(jsonGroup => Group.clone(jsonGroup))),
      catchError(error => this.processHttpError(error))
    )
  }

  public getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(this.url + 'group/'+id).pipe(
      map(jsonGroup => Group.clone(jsonGroup)),
      catchError(error => this.processHttpError(error))
    )
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "users/" + this.token, user).pipe(
      map(jsonUser => User.clone(jsonUser)),
      tap(user => this.messageService.successMessage("user " + user.name + " saved successfully ")),
      catchError(error => this.processHttpError(error))
    )
  }

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "register", user).pipe(
      map(jsonUser => User.clone(jsonUser)),
      tap(user => this.messageService.successMessage("registration successful")),
      catchError(error => this.processHttpError(error))
    )
  }

  public login(auth: Auth): Observable<boolean> {
    //vezme telo a vrati mi ho ako string
    return this.http.post(this.url + 'login', auth, { responseType: 'text' }).pipe(
      map(token => {
        this.token = token
        this.username = auth.name
        this.loggedUserSubscriber?.next(auth.name)
        this.messageService.successMessage("user " + auth.name + " logged in  successfully ")
        return true
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status == 401) {
          this.messageService.errorMessage("Incorrect password or username")
          return of(false)
        }
        return this.processHttpError(error)
      })
    )
  }

  public logout(): void {
    let u = this.username
    this.token = null
    this.username = null
    this.loggedUserSubscriber?.next(null)
    this.http.get(this.url + 'logout/' + this.token).subscribe()
    this.messageService.successMessage("user " + u + " logged out")
  }

  public userConflicts(user: User): Observable<string[]> {
    return this.http.post<string[]>(this.url + 'user-conflicts', user)
      .pipe(catchError(e => this.processHttpError(e)))
  }


  //univerzalny chatcher pri chybe http spojenia
  public processHttpError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status == 0) {
        this.messageService.errorMessage("server uavailible")
      } else {
        if (error.status >= 401 && error.status < 500) {
          //toto 2. error je teraz telo http odpovede
          const message = error.error.errorMessage || JSON.parse(error.error).errorMessage
          if (message == 'unknown token') {
            this.messageService.errorMessage("session expired")
            this.token = null
            this.username = null
            this.loggedUserSubscriber?.next(null)
            this.router.navigateByUrl('/login')
            // this.logout()
          } else {
            this.messageService.errorMessage(message)
          }
        } else {
          if (error.status >= 500) {
            this.messageService.errorMessage("server error, please contact administrator")
            console.error("server error: " + error)
          }
        }
      }
    } else {
      this.messageService.errorMessage("stoopid")
      console.error(error)
    }
    return EMPTY //prazdna uzavreta rura, nikdy nic nepretecie cez nu
  }

}
