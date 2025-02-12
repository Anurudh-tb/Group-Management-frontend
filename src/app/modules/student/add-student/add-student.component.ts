import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
  }

  studentForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    middlename: new FormControl(''),
    lastname: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  onSubmit() {
    if (this.studentForm.valid) {
      console.log('Form Submitted Successfully!', this.studentForm.value);
      this.api.addStudent(this.studentForm.value).subscribe(
        (res:any)=>{
              console.log("success",res);
             
        }
      )
      alert('Form Submitted Successfully!');
      this.studentForm.reset(); // Reset the form after submission
    } else {
      console.log('Form is invalid');
      alert('Please fill all required fields correctly.');
    }
  }
}
