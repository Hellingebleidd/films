import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/entities/group';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  group: Group | undefined
  constructor(private route: ActivatedRoute) { 
    route.data.subscribe(data => {
      this.group = data['group']
    })
  }

  ngOnInit(): void {
  }

}
