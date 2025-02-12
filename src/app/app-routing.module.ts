import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { AuthGuard } from './Authgaurd/auth.guard';
import { DashboardComponent } from './modules/Dashboard/dashboard/dashboard.component';

const routes:Routes=[
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
     canActivate:[AuthGuard]
    },
  { path: '**', redirectTo: 'login' },


]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
