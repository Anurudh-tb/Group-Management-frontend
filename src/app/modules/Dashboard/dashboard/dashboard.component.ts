import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private login:AuthService,public api:ApiService) { }

  students:any =[]
  teachersList:any=[]
  groups: any[] = [];
  ngOnInit(): void {
      this.fetchStudents();
      this.fetchTeacherlist();
      this.getAllGroups();
  }

  dropdownOpen: { [key: string]: boolean } = {
    students: false,
    teachers: false,
    groups: false
  };
  courseMappings: any[] = []; // Store course mappings
  courseName:any=""
  teacherName:any=""
  toggleDropdown(section: string): void {
    this.dropdownOpen[section] = !this.dropdownOpen[section];
  }
  showAddStudent = false;
  showStudentList=false;
  showAddteacher=false;
  showTeacherList=false;
  showAddgroup=false;
  showAddStudentgroup=false;
  showCourseTable=false
  // toggleAddStudent() {
  //   this.showAddStudent = !this.showAddStudent;
  // }

//   onSelectChange(event: Event, type: string) {
//     const selectedValue = (event.target as HTMLSelectElement).value;

//     if (type === 'student') {
//       if(this.showAddStudent = selectedValue === 'add'){
//         this.showAddgroup=false;
//         this.showStudentList = false;
//         this.showAddteacher = false;
//         this.showTeacherList = false;
//         this.showAddStudent = true;
//       }
//       if(this.showStudentList = selectedValue === 'list'){
//         this.showAddgroup=false;
//         this.showStudentList = true;
//         this.showAddteacher = false;
//         this.showTeacherList = false;
//         this.showAddStudent = false;
//       }


//     }
//     else if (type === 'teacher') {
//       if(this.showAddteacher = selectedValue === 'add'){
//         this.showAddgroup=false;
//         this.showStudentList = false;
//         this.showAddteacher = true;
//         this.showTeacherList = false;
//         this.showAddStudent = false;
//       }
//       if(this.showTeacherList=selectedValue==='list'){
//         this.showAddgroup=false;
//         this.showStudentList = false;
//         this.showAddteacher = false;
//         this.showTeacherList = true;
//         this.showAddStudent = false;
//       }

//     }
//     else if(type ==='group'){

//      if( this.showAddgroup=selectedValue==='add'){
//       this.showAddgroup=true;
//       this.showStudentList = false;
//       this.showAddteacher = false;
//       this.showTeacherList = false;
//       this.showAddStudent = false;
//      }





//     }
// }

onSelectChange(event: Event, type: string) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;

  // Reset all boolean flags
  this.showAddgroup = false;
  this.showStudentList = false;
  this.showAddteacher = false;
  this.showTeacherList = false;
  this.showAddStudent = false;
  this.showAddStudentgroup=false;

  if (type === 'student') {
    if (selectedValue === 'add') {
      this.showAddStudent = true;
      this. showCourseTable=false
    } else if (selectedValue === 'list') {
      this.showStudentList = true;
      this. showCourseTable=false
    }
  }
  else if (type === 'teacher') {
    if (selectedValue === 'add') {
      this.showAddteacher = true;
      this. showCourseTable=false
    } else if (selectedValue === 'list') {
      this.showTeacherList = true;
      this. showCourseTable=false
    }
  }
  else if (type === 'group') {
    if (selectedValue === 'add') {
      this.showAddgroup = true;
      this. showCourseTable=false
    }else if(selectedValue==='add-student'){
      this.showAddStudentgroup=true;
      this. showCourseTable=false
    }
  }


  // Reset dropdown selection
  selectElement.selectedIndex = 0;
}




  fetchStudents(){
    this.api.getAllstudents().subscribe((res:any)=>{
      this.students=res.data;
      console.log("students",this.students);

    }
  )
  }
  fetchTeacherlist(){
    this.api.getAllteachers().subscribe((res:any)=>{
      this.teachersList=res.data;
      console.log("teachers",this.teachersList);
    })
  }
  getAllGroups() {
    this.api.getAllGroup().subscribe((response: any) => {
      if (response.success) {
        this.groups = response.data; // Assuming API returns a valid list
      }
    });
  }

  selectedBatchId: number | null = null; // Store selected batch ID

// onBatchSelect(event: Event) {
//   const selectedValue = (event.target as HTMLSelectElement).value;
//   this.selectedBatchId = selectedValue ? Number(selectedValue) : null;
//   console.log('Selected Batch ID:', this.selectedBatchId);
//   this.getAllBatches();
// }
selectedBatch: string = ""; // Default empty value

onBatchSelect(event: Event) {
  this. showCourseTable=true
  this.showAddgroup = false;
  this.showStudentList = false;
  this.showAddteacher = false;
  this.showTeacherList = false;
  this.showAddStudent = false;
  this.showAddStudentgroup=false;
  const selectedValue = (event.target as HTMLSelectElement).value;
  console.log("Selected Batch ID:", selectedValue);
  this.selectedBatch = selectedValue;
  this.getAllBatches();
}


getAllBatches(){
  this.api.getCourseDetails(this.selectedBatch).subscribe(
    (res:any)=>{
      this.courseMappings=res.data
      this.courseName=res.data[0].course.name;
      this.teacherName=res.data[0].course.teacher.name;
    })
}


}
