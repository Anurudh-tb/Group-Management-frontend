import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe]
})
export class StudentModule { }
