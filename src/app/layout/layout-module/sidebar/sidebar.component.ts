import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

 constructor(private login:AuthService,public api:ApiService,public router:Router) { }

    // students:any =[]
    // teachersList:any=[]
    groups: any[] = [];
    ngOnInit(): void {
        // this.fetchStudents();
        // this.fetchTeacherlist();
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

    getAllGroups() {
      this.api.getAllGroup().subscribe((response: any) => {
        if (response.success) {
          this.groups = response.data;
        }
      });
    }

    selectedBatchId: number | null = null; // Store selected batch ID

  selectedBatch: string = ""; // Default empty value

  onBatchSelect(event: Event) {

    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log("Selected Batch ID:", selectedValue);
    this.selectedBatch = selectedValue;
    this.getAllBatches();
  }



  navigateTo(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      console.log("Navigating to:", selectedValue); // Debugging
      this.router.navigateByUrl(selectedValue);
    }
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
