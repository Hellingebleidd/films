import { Component, OnInit } from '@angular/core';
import { Detail } from 'src/entities/detail';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  imdb: string | null


  constructor(private filmservice: FilmsService) {
    this.imdb = this.filmservice.imdb

  }

  ngOnInit(): void {
    if (this.imdb) {
      this.filmservice.getDetail(this.imdb)
      // console.log("cely film?:", this.filmservice.getDetail(this.imdb))
    }
    console.log("detail component:", this.imdb)
    
  }

  

}
