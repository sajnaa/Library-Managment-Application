import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/auth';
import { Router } from '@angular/router';
import { forkJoin,of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: User[] = [];
  disabled:boolean=true
  userAuthData: any = localStorage.getItem('userAuth');
  parsedUserAuth = JSON.parse(this.userAuthData);
  constructor(private router: Router ,private fb: FormBuilder,private userService:UserService,private bookService:BookService) { }
role=this.parsedUserAuth.role
editForm!: FormGroup;
  ngOnInit(): void {
    this.fetchUsers();
    this.editForm = this.fb.group({
      id: [''],
      username: [''],
      collectedBooks: [''],
      limit:['']
    });
  }
  displayStyle = "none"; 
  openPopup() { 
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.editForm.reset();
    this.displayStyle = "none"; 
  } 
  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  data: any = {};
   bookList:any[]=[];

  getdata(id:any): void{
    console.log(id)
    this.userService.getUserById(id).subscribe(
      (userDetails) => {
        console.log(id,userDetails)
        this.data = { ...userDetails };
        const books=userDetails.books
        console.log("userDetails",this.data)
this.bookList=[]
  
      const bookObservables = books.map((bookId :any)=> this.bookService.getBookById(bookId));

forkJoin(bookObservables).subscribe((bookDataArray:any) => {
  console.log("data", bookDataArray);

  // Extract titles from the book data
  this.bookList = bookDataArray.map((bookData:any) => bookData.title);

  console.log("bookList", this.bookList);

  this.editForm.patchValue({
    username: userDetails.username,
    id: userDetails.id,
    collectedBooks: this.bookList.join(),
  });
        });
        this.displayStyle = "block"; 
    
      },
      (error) => {
        console.error(`Error fetching book with ID ${id}:`, error);
      }
    );
  }


  limitupdate(): void {
   
    const updatedBookData = this.editForm.value;
        this.displayStyle = "block"; 
    
      
  }
}
