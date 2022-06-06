import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  constructor(private filmservice: FilmsService) { }

  ngOnInit(): void {
    console.log(
      this.filmservice.getDetail()
    )
  }

}
