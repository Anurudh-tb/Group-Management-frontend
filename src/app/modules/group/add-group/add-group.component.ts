import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators , FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  constructor(public api:ApiService,public router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchTeacherlist();
    this.getAllStudents();

  }
  students:any=[]
  teachersList:any=[];
  selectedStudentIds: number[] = [];
  dropdownOpen:boolean=false;
  groupId:number=0
  // teachers:any=[]

  groupForm= new FormGroup({
      courseName:new FormControl ('', Validators.required),
      teacherId:new FormControl (0, Validators.required)
      // studentId:new FormArray([],Validators.required)
  });
  addStudentsForm = new FormGroup({
    studentId: new FormArray([], Validators.required) // Correctly initializing FormArray
  });



  fetchTeacherlist(){
    this.api.getAllteachers().subscribe((res:any)=>{
      this.teachersList=res.data;
      console.log("teachers",this.teachersList);
    })
  }
  // onSubmit(){
  //       if(this.groupForm.valid){
  //         console.log(this.groupForm.value);

  //         this.api.addGroup(this.groupForm.value).subscribe(
  //           (res:any)=>{
  //             console.log("groupForm",res);

  //           })
  //           alert('Form Submitted Successfully!');
  //           this.groupForm.reset();
  //       } else {
  //         console.log('Form is invalid');
  //         alert('Please fill all required fields correctly.');
  //       }
  // }
  get studentIdArray(): FormArray {
    return this.addStudentsForm.get('studentId') as FormArray;
  }

  onStudentSelect(event: Event, studentId: number) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedStudentIds.push(studentId);
      this.studentIdArray.push(new FormControl(studentId)); // Add to FormArray
    } else {
      this.selectedStudentIds = this.selectedStudentIds.filter(id => id !== studentId);
      const index = this.studentIdArray.controls.findIndex(control => control.value === studentId);
      if (index !== -1) {
        this.studentIdArray.removeAt(index); // Remove from FormArray
      }
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
   getAllStudents() {
    this.api.getAllstudents().subscribe((response: any) => {
      if (response.status === "success" && Array.isArray(response.data)) {
        this.students = response.data;
      } else {
        console.error("Invalid student data received", response);
      }
    });
  }


  onSubmit() {
    console.log("studentId", this.studentIdArray.value);

    // Make sure the groupForm is valid before making the API calls
    if (this.groupForm.invalid) {
      this.toastr.error('Please fill out all the required fields.', 'Validation Error');
      return; // Stop further execution if form is invalid
    }

    // Add group
    this.api.addGroup(this.groupForm.value).subscribe(
      (res: any) => {
        console.log("Response group", res);

        this.groupId = res.data.groupId;
        console.log("groupId", this.groupId);

        // Add students to the group
        this.api.addStudentList(this.groupId, { studentIds: this.studentIdArray.value }).subscribe(
          (res: any) => {
            console.log("response", res);
            // Show success toastr notification
            this.toastr.success('Group and students added successfully!', 'Success');

            // Navigate to group-list only after successful student addition
            this.router.navigate(['/group/group-list']);
          },
          (error) => {
            console.error("Error adding students", error);
            // Show error toastr notification
            this.toastr.error('Failed to add students.', 'Error');
          }
        );
      },
      (error) => {
        console.error("Error adding group", error);
        // Show error toastr notification for group creation failure
        this.toastr.error('Failed to create group.', 'Error');
      }
    );
  }

}
