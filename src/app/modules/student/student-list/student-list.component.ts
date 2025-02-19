import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  constructor(public api:ApiService) { }
  students:any =[]

  ngOnInit(): void {
    this.fetchStudents();
  }
  fetchStudents(){
    this.api.getAllstudents().subscribe((res:any)=>{
      this.students=res.data;
      console.log("students",this.students);

    }
  )
  }
}
