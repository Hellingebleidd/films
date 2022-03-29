import { Component, OnInit } from '@angular/core';
import { Film } from 'src/entities/film';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.css']
})
export class FilmsListComponent implements OnInit {

  films: Film[] = []
  columnsToDisplay=['id','nazov', 'rok']

  constructor(private filmsService: FilmsService) { }

  ngOnInit(): void {
    if(this.filmsService.token){
      this.columnsToDisplay=['id','nazov', 'slovenskyNazov', 'rok', 'afi1998', 'afi2007']
    }
    this.filmsService.getFilms().subscribe(resp=>{
      this.films = resp.items
      console.log('FILMY: ',resp)
    })
  }

}
