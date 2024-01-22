import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  logout(){
    this.userService.logout()
    location.reload()
  }
}
