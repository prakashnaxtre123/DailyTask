import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    const data=sessionStorage.getItem('userdata');
    if(data){
      sessionStorage.clear();
      alert("logout Sucessfully");
      this.router.navigate(['/login'])
    }
    else{
      alert("After LogIn U can logOut");
    }
  }
}
