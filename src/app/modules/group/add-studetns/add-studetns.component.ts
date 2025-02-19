import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-studetns',
  templateUrl: './add-studetns.component.html',
  styleUrls: ['./add-studetns.component.scss']
})
export class AddStudentGroupComponent implements OnInit {

  constructor(public api:ApiService) { }

  students: any[] = []; // Store students
  selectedStudentIds: number[] = []; // Store selected student IDs
  groups: any[] = [];

  addStudentsForm = new FormGroup({
    groupId: new FormControl('', Validators.required),
    studentId: new FormArray([], Validators.required) // Correctly initializing FormArray
  });

  dropdownOpen: boolean = false; // For dropdown toggle



  ngOnInit() {
    this.getAllGroups();
    this.getAllStudents();
  }

  get studentIdArray(): FormArray {
    return this.addStudentsForm.get('studentId') as FormArray;
  }

  getAllGroups() {
    this.api.getAllGroup().subscribe((response: any) => {
      if (response.success) {
        this.groups = response.data; // Assuming API returns a valid list
      }
    });
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

  // Toggle student selection in FormArray
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

  onSubmit() {
    if (this.addStudentsForm.valid) {
      const groupId = Number(this.addStudentsForm.value.groupId);
      if (isNaN(groupId)) {
        alert("Invalid group ID");
        return;
      }

      this.api.addStudentList(groupId, { studentIds: this.addStudentsForm.value.studentId })
        .subscribe(
          (response: any) => {
            console.log("Students added successfully:", response);
            alert("Students added successfully!");
            this.addStudentsForm.reset();
            this.studentIdArray.clear(); // Reset FormArray
            this.selectedStudentIds = []; // Reset selection
          },
        );
    }
  }
}
