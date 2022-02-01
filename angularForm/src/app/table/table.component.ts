import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    disabled:boolean=false;
    date:any="";
    task: string="";
    comment:string="";
    /* sr_no:Number = 0; */
    task_id: Number = 0;
   /*  task_size:any=[];
    task_length:Number=0; */
  constructor( private http: HttpClient,private router:Router) { 
    setInterval(()=>{
      this.date=new Date().getDate()+"/"+new Date().getMonth()+1+"/"+new Date().getFullYear();
    },1000)

    this.task_id=Math.floor(1000 + Math.random() * 9000);
    
  }
 
  ngOnInit(): void {
   /*  this.http.get(environment.apiUrl+"getTask").subscribe((res)=>{
      this.task_size=res;
      this.task_length=this.task_size.length+1; 
    })*/
  }
  onSubmit(form:NgForm){
    console.log(form);
    let data={
     /*  sr_no: this.task_length, */ 
      task_id:this.task_id,
      date:this.date,
      task:this.task,
      comment:this.comment
    };
    this.http.post(environment.apiUrl+'addTask', data).subscribe((res)=>{
      // this.allTasks = res;
      console.log(res);
      alert("Data added Sucessfully")
      this.router.navigate(['/view-table']); 
    },(err)=>{
      console.log(err);
      console.log("Error comes");
      alert("Each Text field must contains 10 character")
    });

  }

}
