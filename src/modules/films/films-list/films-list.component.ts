import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, mergeAll, mergeMap, Observable, of, Subject, tap } from 'rxjs';
import { Film } from 'src/entities/film';
import { FilmsResponse } from 'src/entities/films-response';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit, AfterViewInit {

  filmsDataSource: FilmsDataSource
  columnsToDisplay = ['id', 'nazov', 'rok']

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort: MatSort | undefined
  filter$ = new Subject<string>() //to je prud

  constructor(private filmsService: FilmsService) {
    this.filmsDataSource = new FilmsDataSource(filmsService)
  }

  ngOnInit(): void {
    if (this.filmsService.token) {
      this.columnsToDisplay = ['id', 'nazov', 'slovenskyNazov', 'rok', 'afi1998', 'afi2007']
    }
    // this.filmsService.getFilms().subscribe(resp => {
    //   this.films = resp.items
    //   console.log('FILMY: ', resp)
    // })
  }

  ngAfterViewInit(): void {
    if (this.paginator && this.sort)
      this.filmsDataSource.addEventObservables(this.paginator, this.sort, this.filter$.asObservable())
  }

  filter(event: any) {
    const filterString = event.target.value
    //TODO spracovat
    this.filter$.next(filterString)
  }

}

class FilmsDataSource implements DataSource<Film>{

  futureObservables = new EventEmitter<Observable<any>>()
  paginator: MatPaginator | undefined
  indexFrom: number = 0
  indexTo: number = 10
  filterString: string | undefined

  constructor(private filmsService: FilmsService) { }

  goToFirstPage() {
    if (this.paginator) {
      this.indexFrom = 0
      this.indexTo = this.paginator.pageSize
      this.paginator.firstPage()
    }
  }

  addEventObservables(paginator: MatPaginator, sort: MatSort, filter$: Observable<string>) {
    this.paginator = paginator
    this.indexFrom = 0
    this.indexTo = paginator.pageSize

    this.futureObservables.emit(filter$.pipe(
      tap(filterString => {
        this.filterString = filterString.trim().toLowerCase() || undefined
        this.goToFirstPage()
      })
    ))
    this.futureObservables.emit(of("init request"))
    this.futureObservables.emit(paginator.page.pipe(
      tap(pageEvent => {
        this.indexFrom = pageEvent.pageIndex * pageEvent.pageSize
        this.indexTo = Math.min(this.indexFrom + pageEvent.pageSize, pageEvent.length)
        // this.indexTo = this.indexTo > pageEvent.length ? pageEvent.length : this.indexTo

      })
    ))
    this.futureObservables.emit(sort.sortChange)
  }

  connect(collectionViewer: CollectionViewer): Observable<readonly Film[]> {
    return this.futureObservables.pipe(
      mergeAll(),
      tap(e => console.log("event to get files from server: ", e)),
      mergeMap(e => this.filmsService.getFilms(this.indexFrom, this.indexTo, this.filterString)),
      map((resp: FilmsResponse) => {
        if (this.paginator)
          this.paginator.length = resp.totalCount
        return resp.items
      })
    )
  }
  disconnect(collectionViewer: CollectionViewer): void {

  }

}