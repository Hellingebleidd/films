import { Component, OnInit } from '@angular/core';
import { Group } from 'src/entities/group';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groups: Group[] = []

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getGroups().subscribe(g => this.groups = g)
  }

}
