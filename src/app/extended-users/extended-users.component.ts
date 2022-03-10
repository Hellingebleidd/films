import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/entities/user';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['id', 'name', 'email', 'active', 'lastLogin', 'groups', 'permissions']
  // users: User[] = []
  usersDataSource = new MatTableDataSource<User>()
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined
  @ViewChild(MatSort) sort: MatSort | undefined
  // filter = ""
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getExtendedUsers().subscribe(u => {
      // this.users=u
      this.usersDataSource.data = u
      console.log(u)
    })
  }

  ngAfterViewInit(): void {
    if (this.paginator && this.sort) {
      this.usersDataSource.paginator = this.paginator
      this.usersDataSource.sort = this.sort
    }
    this.usersDataSource.filterPredicate = (user: User, filter: string): boolean => {
      if (user.name.toLowerCase().includes(filter)) return true
      if (user.email.toLowerCase().includes(filter)) return true
      if (user.groups.some(g => {
        if (g.name.toLowerCase().includes(filter)) return true
        return g.permissions.some(p => p.toLowerCase().includes(filter))
      })) return true
      return false
    }
    this.usersDataSource.sortingDataAccessor = (user: User, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'groups':
          return user.groups.map(g => g.name).join(", ")
        case 'permissions':
          return user.groups.flatMap(g => g.permissions).join(", ")
        default:
          return user[sortHeaderId as keyof User]?.toString() || ''
      }
    }
  }

  filter(event: any) {
    this.usersDataSource.filter = event.target.value.toLowerCase()
  }
}


