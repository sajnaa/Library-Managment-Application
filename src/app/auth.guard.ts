import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     const userAuthData:any = localStorage.getItem('userAuth');
     const parsedUserAuth:any = JSON.parse(userAuthData);
     const  isAuthenticated: boolean = parsedUserAuth?.isAuthenticated ?? false;
     if(isAuthenticated){
    console.log(isAuthenticated)
      return true
     }
    console.log(isAuthenticated)

       this.router.navigate(['/login'])
    return false;
  }
  
}
