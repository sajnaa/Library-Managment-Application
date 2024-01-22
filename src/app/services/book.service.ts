// book.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { Books,DeleteResponse } from '../interfaces/books';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; 


  private books = [
    { id: 1, title: 'Book 1', author: 'Author 1', description: 'Description 1' },
    { id: 2, title: 'Book 2', author: 'Author 2', description: 'Description 2' },
    // Add more books as needed
  ];
  constructor(private http: HttpClient) {}
 
  getBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(this.apiUrl);
  }
  getBookById(id:number): Observable<any> {
    console.log(`${this.apiUrl}/${id}`)
    console.log(id)
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  createBook(booksData: Books): Observable<Books> {
    return this.http.post<Books>(this.apiUrl, booksData);
  }
  deleteBook(id: number): Observable<any> {
    console.log(typeof id)
    const url = `${this.apiUrl}/${id}`;
    console.log(`Deleting book with ID: ${id}`);
    console.log( url)
    return this.http.delete<Books>(url);
  }
 
  editBook(id: number, updatedBookData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log(updatedBookData)
    console.log(id)

    return this.http.put(url, updatedBookData);
  }

}
