import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { GroupAddComponent } from './group-add/group-add.component';
import { MaterialModule } from '../material.module';
import { GroupDetailComponent } from './group-detail/group-detail.component';


@NgModule({
  declarations: [
    GroupsListComponent,
    GroupMenuComponent,
    GroupAddComponent,
    GroupDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
