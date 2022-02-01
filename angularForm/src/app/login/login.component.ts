import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  /* providers:[AuthGuard] */
})
export class LoginComponent implements OnInit {
  disabled:boolean=false;
  password:string="";
  email:string="";
  submited:boolean=false;
  constructor(
    private http:HttpClient,
    private router:Router,
  ) { }

  ngOnInit(): void {
    const sessionData=sessionStorage.getItem("userdata");
    if(sessionData){
      alert("After LogOut U can logIn again");
      this.router.navigate(['/view-table']);
    }
  }
  onSubmit(data:any){
    const sessionData=sessionStorage.getItem("userdata")
    this.submited=true;
    console.log(data);
    let loginData ={
      email:this.email,
      password:this.password,
    };
    this.http.post(environment.apiUrl+'login',loginData).subscribe((response)=>{
      let data = response;
      let userdata=JSON.stringify(data);
      console.log(userdata);
      sessionStorage.setItem('userdata',userdata);
     // localStorage.setItem('userdata', userdata);
     this.router.navigate(['/view-table']);
    },(error)=>{
      console.log(error);
      alert("Invalid credential");
     // console.log("password mismatched") 
    })

  }

}
