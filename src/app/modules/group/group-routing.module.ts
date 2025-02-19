import { ViewGroupComponent } from './view-group/view-group.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupListComponent } from './group-list/group-list.component';

const routes: Routes = [
  { path: 'add-group', component: AddGroupComponent },
  { path: 'group-list', component: GroupListComponent },
   {path:'view-group',component:ViewGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
