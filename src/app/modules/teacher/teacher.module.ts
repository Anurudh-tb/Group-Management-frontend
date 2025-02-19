import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    PaginatorModule,
    FormsModule
  ]
})
export class TeacherModule { }
