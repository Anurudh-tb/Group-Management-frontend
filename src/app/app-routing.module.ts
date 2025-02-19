import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import{RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { SidebarComponent } from './layout/layout-module/sidebar/sidebar.component';
import { LayoutModuleComponent } from './layout/layout-module/layout-module.component';
import { AuthGuard } from './Authgaurd/auth.guard';


const routes:Routes=[

  // { path: 'login', component: LoginComponent,},
  // {path:'',component:SidenavComponent,
  //   children:[
  //     { path: 'dashboard', component: DashboardComponent,
  //   //  canActivate:[AuthGuard]
  //   },
  // {path :'add-student',component:AddStudentComponent},
  // {path:'student-list',component:StudentListComponent},
  // {path:'add-teacher',component:AddTeacherComponent},
  // {path:'teacher-list',component:TeacherListComponent},
  // {path:'add-group',component:AddGroupComponent},
  // {path:'group-list',component:GroupListComponent},

  //   ]
  // }

  { path: 'login',component:LoginComponent },
  {path:'',component:LayoutModuleComponent,
    // canActivate:[AuthGuard],
    children:[
      {
        path:'student',loadChildren:()=>import('./modules/student/student.module').then(m=>m.StudentModule)
      },
      {path:'teacher',loadChildren:()=>import('./modules/teacher/teacher.module').then(m=>m.TeacherModule)},

      {path:'group',loadChildren:()=>import('./modules/group/group.module').then(m=>m.GroupModule)}

    ]
  }
  // { path: '**', redirectTo: 'login' } // Redirect unknown routes to login


  // ,
  // { path: '**', redirectTo: 'login' },

  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },



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
