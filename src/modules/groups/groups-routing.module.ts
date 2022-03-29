import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { ResolveGroupService } from 'src/guards/resolve-group.service';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

const routes: Routes = [
  {
    path: '', component: GroupMenuComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: GroupsListComponent },
      { path: 'add', component: GroupAddComponent },
      {
        path: 'detail/:id', component: GroupDetailComponent,
        data: { blbost: "HAHAH" },
        resolve: {
          group: ResolveGroupService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
