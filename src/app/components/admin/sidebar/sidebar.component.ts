import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  userAuthData: any = localStorage.getItem('userAuth');
  parsedUserAuth:any = JSON.parse(this.userAuthData);
  role=this.parsedUserAuth.role
  ngOnInit(): void {
  }

}
