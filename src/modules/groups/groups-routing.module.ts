import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

const routes: Routes = [
  {
    path: "groups", component: GroupMenuComponent,
    children: [
      { path: 'list', component: GroupsListComponent },
      { path: 'add', component: GroupAddComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
