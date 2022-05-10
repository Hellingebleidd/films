import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
//import { Film } from 'src/entities/film';
import { FilmsResponse } from 'src/entities/films-response';
import { UsersService } from 'src/services/users.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  url = environment.restServer + 'films/'
  omdbUrl = environment.omdbServer + '?apikey=8c8d8a8d&'
  // apiKey = '&apikey=8c8d8a8d'

  // private films: Film
  constructor(private http: HttpClient, private usersService: UsersService) { }

  get token(): string | null {
    return this.usersService.token
  }

  // get imdbId(): string | null {
  //   return this.films.imdbID
  // }

  getHeader(): {
    headers?: { "X-Auth-Token": string },
    params?: HttpParams
  } | undefined {
    return this.token
      ? {
        headers:
          { "X-Auth-Token": this.token }
      }
      : undefined
  }

  getDetail(){
    return this.http.get(this.omdbUrl+'i=tt0050083')
  }

  getFilms(indexFrom?: number,
    indexTo?: number,
    search?: string,
    orderBy?: string,
    descending?: boolean): Observable<FilmsResponse> {

    let httpOptions = this.getHeader()
    if (indexFrom || indexTo || search || orderBy || descending) {
      httpOptions = { ...httpOptions, params: new HttpParams() }
    }
    if (indexFrom && httpOptions?.params)
      httpOptions.params = httpOptions?.params?.set('indexFrom', indexFrom)

    if (indexTo && httpOptions?.params)
      httpOptions.params = httpOptions?.params?.set('indexTo', indexTo)

    if (search && httpOptions?.params)
      httpOptions.params = httpOptions?.params?.set('search', search)

    if (orderBy && httpOptions?.params)
      httpOptions.params = httpOptions?.params?.set('orderBy', orderBy)

    if (descending && httpOptions?.params)
      httpOptions.params = httpOptions?.params?.set('descending', descending)

    return this.http.get<FilmsResponse>(this.url, httpOptions).pipe(
      catchError(er=>this.usersService.processHttpError(er))
    )
  }
}
