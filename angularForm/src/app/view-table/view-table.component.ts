import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements OnInit {
   allTask:any=[];
   task:string="";
   comment:string="";
   page:any;
   itemsPerPage:number=6;
  /*  sr_no:any=[]; */
  constructor(private http:HttpClient,private router:Router) { 
   //this.allTask=this.allTask;
  }

 
  ngOnInit(): void {
    this.http.get(environment.apiUrl+'getTask').subscribe((res)=>{
      //this.allTask=JSON.stringify(res);
      this.allTask=res;
      console.log(res);
     })
  }
  

  updateData(_id:any,task:string,comment:string){
    console.log(_id);
    let data={
      _id:_id,
       task:task,
      comment:comment 
    };
    this.http.patch(environment.apiUrl+'updateTask',data).subscribe((res)=>{
     console.log(res);
     alert("Data updated Successfully!!!")
     this.allTask=res;
     })
  }

  deleteData(_id:any){
    //console.log(id);
    //this.allTask.splice(_id-1,1);
    this.http.delete(`${environment.apiUrl}deleteTask?_id=${_id}`).subscribe((res)=>{
      console.log(res);
      alert("Data Deleted Successfully!!!!!!");
       this.allTask=res; 
      
      },(error)=>{
        console.log(error)
        alert("Data Delation failed  !!!!!! ")
      })
      
    
  }
 
}
