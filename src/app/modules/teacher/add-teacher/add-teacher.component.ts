import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
  }


  countryCodes = [
    { value: '+91', label: '+91 (India)' },
    { value: '+1', label: '+1 (USA)' },
    { value: '+44', label: '+44 (UK)' },
    { value: '+81', label: '+81 (Japan)' },
    { value: '+61', label: '+61 (Australia)' }
  ];
  teacherForm=new FormGroup({
    name: new FormControl ('',Validators.required),
    address: new FormControl('', Validators.required),
    email:new FormControl ('', [Validators.required, Validators.email]),
    marital_status: new FormControl('', Validators.required),
    govt_id:new FormControl ('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    countryCode: new FormControl('+91', Validators.required),
    phone:new FormControl ('', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)])
  });


  onSubmit() {
    if (this.teacherForm.valid) {
      this.api.addTeacher(this.teacherForm.value).subscribe(
        (res: any) => {
          console.log("Teacher added successfully", res);
        }
      );
      alert('Form Submitted Successfully!');
      this.teacherForm.reset();
    } else {
      console.log('Form is invalid');
      alert('Please fill all required fields correctly.');
    }
  }


}
