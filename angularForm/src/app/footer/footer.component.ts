import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  cur_year:any;

  constructor() { }

  ngOnInit(): void {
    this.cur_year=new Date().getFullYear();
  }

}
