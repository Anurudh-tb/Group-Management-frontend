
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/user/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/Dashboard/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTeacherComponent } from './modules/teacher/add-teacher/add-teacher.component';
import { AddGroupComponent } from './modules/group/add-group/add-group.component';
import { AddStudentComponent } from './modules/student/add-student/add-student.component';
import { StudentListComponent } from './modules/student/student-list/student-list.component';
import { TeacherListComponent } from './modules/teacher/teacher-list/teacher-list.component';
import { GroupListComponent } from './modules/group/group-list/group-list.component';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModuleComponent } from './layout/layout-module/layout-module.component';
import { SidebarComponent } from './layout/layout-module/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AddTeacherComponent,
    AddGroupComponent,
    AddStudentComponent,
    StudentListComponent,
    TeacherListComponent,
    GroupListComponent,
    LayoutModuleComponent,
    SidebarComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),









  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
