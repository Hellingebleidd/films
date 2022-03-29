import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmsRoutingModule } from './films-routing.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    FilmsListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule { }
