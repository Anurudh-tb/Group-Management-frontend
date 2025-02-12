import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthGuard } from 'src/app/Authgaurd/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authgaurd:AuthGuard,public router:Router,public auth:AuthService) { }


  ngOnInit() {

  }
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  onLogin(){
    this.auth.getlogin(this.loginForm.value).subscribe({
      next: (res:any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['dashboard']); // Redirect to dashboard after login
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Invalid credentials');
      },
    });
  }


}
