// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/auth';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Adjust the URL based on your JSON server setup

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

   isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();


  login(username: string, password: string) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map((users) => {
        console.log(users[0].role)
        const isAuthenticated = users.length > 0;
        this.isAuthenticatedSubject.next(isAuthenticated);
        const data={
          isAuthenticated:isAuthenticated,
          role:users[0].role,
          data:users,
          userId:users[0].id
        }
        return data;
      })
    );
  }

  logout(): void {
    localStorage.clear()
  }
  private userAuthData: any = localStorage.getItem('userAuth');
  private parsedUserAuth = JSON.parse(this.userAuthData);
  isAuthenticated: boolean = this.parsedUserAuth?.isAuthenticated ?? false;

getUserById(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${userId}`);
}

updateUserDetails(userId: number, updatedDetails: any): Observable<any> {
  const url = `${this.apiUrl}/${userId}`;


  return this.http.put(url, updatedDetails);
}
editUser(id: number, updatedUserData: any): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.put(url, updatedUserData);
}
}