import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  addStudent(payload:any){
        return this.http.post("http://localhost:4000/api/database/studentlist/add",payload);
  }
  getAllstudents(){
    return this.http.get("http://localhost:4000/api/database/studentlist/list");
  }
  addTeacher(payload:any){
    return this.http.post(`http://localhost:4000/api/database/teacherlist/addteacher`,payload);
  }
  getAllteachers(){
    return this.http.get(`http://localhost:4000/api/database/teacherlist/list`);
  }
  addGroup(payload:any){
    return this.http.post("http://localhost:4000/api/database/courseList/groups",payload);
  }
  addStudentList(groupId:number,students:any){
    return this.http.post(`http://localhost:4000/api/database/courseList/groups/${groupId}/add-students`,students);
  }
  getAllGroup(){
    return this.http.get("http://localhost:4000/api/database/courseList/getcourses");
  }
  getCourseDetails(groupId:any){
    return this.http.get(`http://localhost:4000/api/database/courseList/getCourseDetails/${groupId}`)
  }

}
