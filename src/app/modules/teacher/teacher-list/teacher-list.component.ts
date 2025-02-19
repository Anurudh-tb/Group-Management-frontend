import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

  teachersList: any[] = [];    // Full data
  paginatedTeachers: any[] = []; // Data for the current page
  totalRecords: number = 0;
  rowsPerPage: number = 10;
  first: number = 0;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.fetchTeacherlist();
  }

  fetchTeacherlist() {
    this.api.getAllteachers().subscribe((res: any) => {
      this.teachersList = res.data;
      this.totalRecords = this.teachersList.length;
      this.updatePagination();
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rowsPerPage = event.rows;
    this.updatePagination();
  }

  updatePagination() {
    this.paginatedTeachers = this.teachersList.slice(this.first, this.first + this.rowsPerPage);
  }
}
