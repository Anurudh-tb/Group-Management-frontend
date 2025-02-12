
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddStudentComponent } from './modules/student/add-student/add-student.component';
import { LoginComponent } from './modules/user/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/Dashboard/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTeacherComponent } from './modules/teacher/add-teacher/add-teacher.component';
import { AddGroupComponent } from './modules/group/add-group/add-group.component';
import { AddStudentGroupComponent } from './modules/group/add-studentgroup/add-studetns.component';


@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    LoginComponent,
    DashboardComponent,
    AddTeacherComponent,
    AddGroupComponent,
    AddStudentGroupComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,






  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
