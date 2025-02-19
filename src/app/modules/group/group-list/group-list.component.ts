import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  constructor(public api:ApiService,public router:Router) { }

  groups: any[] = [];
  courseMappings: any[] = [];
  courseName: string = "";
  teacherName: string = "";
  selectedBatch: string = "";
  @Input() selectedGroupId:any='';



  ngOnInit(): void {


    this.getAllGroups();

    // this.getGroupDetails();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedGroupId'] && changes['selectedGroupId'].currentValue) {
      this.selectedBatch = this.selectedGroupId; // Sync input value
      this.getGroupDetails();
    }
  }

  // Fetch all groups
  getAllGroups() {
    this.api.getAllGroup().subscribe((response: any) => {
      if (response.success) {
        this.groups = response.data;
      }
    });
  }

  // When a group is selected
  onBatchSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("Selected Group ID:", selectedValue);
    this.selectedBatch = selectedValue;
    this.getGroupDetails();
  }

  // Fetch group details
  getGroupDetails() {
    if (!this.selectedBatch) return;

    this.api.getCourseDetails(this.selectedBatch).subscribe((res: any) => {
      console.log("grouplist res",res);

      if ( res.data.length > 0) {

        this.courseMappings = res.data;
        console.log("courseee",this.courseMappings);

        this.courseName = res.data[0].course.name;
        console.log("coursename",this.courseName);

        this.teacherName = res.data[0].course.teacher.name;
      } else {
        this.courseMappings = [];
        this.courseName = "N/A";
        this.teacherName = "N/A";
      }
    });
  }
  viewStudentDetails(student: any) {
    if (!student) return;
    this.router.navigate(['/group/student-details'], {
      queryParams: {
        studentName: student.fullname,
        teacherName: this.teacherName,
        groupName: this.courseName
      }
    });
  }

}
