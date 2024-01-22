import { Component } from '@angular/core';
import { Router ,NavigationEnd , Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUrl: string ;
  title = 'task';
  userAuthData: any = localStorage.getItem('userAuth');
  parsedUserAuth:any = JSON.parse(this.userAuthData);
  isAuthenticated: boolean = this.parsedUserAuth?.isAuthenticated ?? false;
myRouter:any;
  constructor(private router:Router) {
    this.myRouter=this.router
    console.log(this.myRouter)
    console.log('isAuthenticated:', this.isAuthenticated);
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
       
        this.currentUrl = event.url;
        console.log(this.currentUrl)
      });
  }
}
