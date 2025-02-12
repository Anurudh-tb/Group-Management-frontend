import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  constructor(public api:ApiService) { }

  ngOnInit(): void {
    this.fetchTeacherlist();
  }
  teachersList:any=[];
  // teachers:any=[]

  groupForm= new FormGroup({
    courseName:new FormControl ('', Validators.required),
      teacherId:new FormControl ('', Validators.required)
  })

  fetchTeacherlist(){
    this.api.getAllteachers().subscribe((res:any)=>{
      this.teachersList=res.data;
      console.log("teachers",this.teachersList);
    })
  }
  onSubmit(){
        if(this.groupForm.valid){
          console.log(this.groupForm.value);

          this.api.addGroup(this.groupForm.value).subscribe(
            (res:any)=>{
              console.log("groupForm",res);

            })
            alert('Form Submitted Successfully!');
            this.groupForm.reset();
        } else {
          console.log('Form is invalid');
          alert('Please fill all required fields correctly.');
        }
  }

}
