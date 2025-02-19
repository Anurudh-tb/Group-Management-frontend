import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor(public api:ApiService,private router:Router,public toastr:ToastrService) { }

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
        (res: any) => {
          console.log("Success", res);
          this.toastr.success('Student added successfully!', 'Success');
          this.router.navigate(['/student/student-list']); // Correct redirection after success
        },
        (error) => {
          console.error('Error adding student', error);

          // Handle errors gracefully without redirecting to login
          this.toastr.error('Failed to add student. Please try again.', 'Error');

          // You can check for specific error codes here if needed
          if (error.status === 401) {
            this.toastr.error('Session expired. Please log in again.', 'Error');
          }
        }
      );

      this.studentForm.reset();
    } else {
      this.toastr.warning('Please fill all required fields correctly.', 'Warning');
    }
  }
}
