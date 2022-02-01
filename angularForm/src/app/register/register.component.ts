import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  disabled:boolean=false;
  submited:boolean=false;
  password:string="";
  cnfpassword:string="";
  name:string="";
  email:string="";
  phone:string="";
  department:string="";

  constructor(
     private http: HttpClient,
     private router:Router
     ) {  }
  
  ngOnInit(): void {
    const sessionData=sessionStorage.getItem("userdata");
    if(sessionData){
      alert("After LogOut U can Register");
      this.router.navigate(['/view-table']);
    }
  }
  onSubmit(){
      if(this.password==this.cnfpassword){ 
        console.log("here");
        this.disabled=true;
        // console.log(form);
        //const configUrl = environment.apiUrl + '/test';
        let registerData = {
          name: this.name,
          email:this.email,
          phone:this.phone,
          password: this.password,
          department:this.department,

        }
        this.http.post(environment.apiUrl + 'students', registerData).subscribe((res)=>{
          console.log(res);
          alert("Registration Success");
          this.router.navigate(['/login']);
        },(err)=>{
          console.log(err);
          console.log("Error comes");
          alert(`registration failed..... Email and password can't be same`)
        });

        
      }
  }
}
