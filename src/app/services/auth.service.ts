import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  constructor(private http:HttpClient,private router:Router) { }
  private apiUrl='http://localhost:4000/api/database/users';

  getlogin(form:any){
    return this.http.post(`${this.apiUrl}/login`, form);9
  }
  signUp(email:string,password:string,confirmPassword:string){
    return this.http.post(`${this.apiUrl}/signup`, { email, password, confirmPassword });
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    console.log("tokennnnn",token)
    if(localStorage.getItem('token')){
      console.log("first if",);

      if (this.jwtHelper.isTokenExpired(token)) {
        console.log("second if");

        localStorage.removeItem('token');
        this.router.navigate(['']);
        return false;

      }else{
      return true;
      }

    }
    else return false;
  }

}
