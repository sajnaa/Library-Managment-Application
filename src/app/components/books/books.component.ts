import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Books } from '../../interfaces/books';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/auth.service';
import { forkJoin,of } from 'rxjs';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
 
  constructor(private router: Router,private bookService: BookService ,private fb: FormBuilder,private userService:UserService) {}
  books: Books[] = [];
  userAuthData:any = localStorage.getItem('userAuth');
  parsedUserAuth = JSON.parse(this.userAuthData);
role=this.parsedUserAuth.role
userId=this.parsedUserAuth.userId

  ngOnInit(): void {
    this.getBooks();
    this.editForm = this.fb.group({
      title: [''],
      authorName: [''],
      description: [''],
    });
  }
  editForm!: FormGroup;
  isModalVisible: boolean = true;
  selectedBook: any = {}; // To store the book data being edited
  goToCreateBookPage() {
    this.router.navigate(['/createbook']); // Replace '/create' with the actual route path for your create page
  }
  getBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        this.books = data;
      for(let i=0;i<data.length;i++){
        this.userService.getUserById(data[i].users[0]).subscribe((data)=>{
        console.log("dadd",data)

          this.books[i].userName=data.username
        })
      }
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  displayStyle = "none"; 
  displayViewStyle="none"
  displayViewlistuserStyle="none"
  openPopup() { 
    this.displayStyle = "block"; 

  } 
  openViewuserPopup() { 
    this.displayViewlistuserStyle = "block"; 

  } 
  viewPopup(){
    this.displayViewStyle="block"
  }
  viewClosePopup(){
    this.displayViewStyle="none"
  }
  viewUserClosePopup(){
    this.displayViewlistuserStyle="none"
  }
  closePopup() { 
    this.editForm.reset();
    this.displayStyle = "none"; 
  } 
deleteBook(id: number ): any {

  if (confirm('Are you sure you want to delete this book?')) {
    this.bookService.deleteBook(id).subscribe(
      () => {
      
        // Refresh the book list after successful deletion
        this.getBooks();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            console.error(`Book with ID ${id} not found.`);
          } else {
            console.error('Error deleting book:', error);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  }
  
}
users:any;
editBook(id: number): void {
  this.bookService.getBookById(id).subscribe(
    (book) => {
      console.log(book)
      this.users=book.users
      this.editForm.patchValue({
        title: book.title,
        authorName: book.authorName,
        description: book.description,
      });
      console.log(book)
      this.selectedBook = { ...book };
      this.isModalVisible = true;
      this.displayStyle = "block"; 
  
    },
    (error) => {
      console.error(`Error fetching book with ID ${id}:`, error);
    }
  );
}
updateSuccess: boolean = false;
updateBook(): void {
  if (this.editForm.valid) {
    const updatedBookData = this.editForm.value;
    updatedBookData.status=this.selectedBook.status
    updatedBookData.userId=this.userId
    updatedBookData.users=this.users
    console.log(updatedBookData)
    this.bookService.editBook(this.selectedBook.id, updatedBookData).subscribe(
      () => {
        this.updateSuccess=true;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 2000); 
        console.log(`Book with ID ${this.selectedBook.id} edited successfully.`);
        this.isModalVisible = false;
        this.closePopup(); // Close the modal or handle as needed
          this.getBooks();

      },
      (error) => {
        console.error(`Error editing book with ID ${this.selectedBook.id}:`, error);
      }
    );
  }
}
getUserAccess(users:any){
  // console.log("usersusers",users)
  return users.includes(this.userId)
}
getUserAccessBook(book:any){
  // console.log(book)
  return book.users.includes(this.userId)?true:book.status === 'available'
}


returnBook(id: number){
  this.bookService.getBookById(id).subscribe(
    (book) => {
      let myBooks = book;
      let myUser = this.parsedUserAuth.data[0]
      console.log("mybook",myBooks)
      let newBook = myBooks.users.filter((obj:any)=>obj !== id);
      console.log(newBook)
      
      let newUser = myUser.books.filter((obj:any)=>obj !== this.userId);
      console.log(newUser)
     
      myBooks.users = newUser;
       myUser.books = newBook;
      console.log(  myBooks.users, myUser.books )
      myBooks.status="available"
      console.log(myBooks)
       this.bookService.editBook(id,myBooks).subscribe((data)=>{
        // console.log("myUser",data)
        this.userService.editUser(this.userId,myUser).subscribe((data)=>{
          // console.log("myUsermyUsermyUser",data)
          this.getBooks();
        })
      });
    
    },
    (error) => {
      console.error(`Error fetching book with ID ${id}:, error`);
    }
  );
}

getBook(id: number){
  this.bookService.getBookById(id).subscribe(
    (book) => {
      let myBooks = book;
      let myUser = this.parsedUserAuth.data[0]
      myUser.books = [...myUser.books, id]
      myBooks.users = [...book.users, this.userId];
      myBooks.status="Not Available"
    this.bookService.editBook(id,myBooks).subscribe((data)=>{
      console.log("myUser",data)
      this.userService.editUser(this.userId,myUser).subscribe((data)=>{
        console.log("myUsermyUsermyUser",data)
        this.getBooks();

      })
    });
    
    },
    (error) => {
      console.error(`Error fetching book with ID ${id}:, error`);
    }
  );
}
data: any = {};
userList:any[]=[];
viewUserList(id:any){
  console.log(id)
  this.bookService.getBookById(id).subscribe(
    (userDetails) => {
      // console.log(id,userDetails)
      this.data = { ...userDetails };
      const users=userDetails.users
      console.log("userDetails",users)
this.userList=[]

    const userData = users.map((userId :any)=> this.userService.getUserById(userId));
console.log(userData)
forkJoin(userData).subscribe((userDataArray:any) => {
console.log("data", userDataArray);

// Extract titles from the book data
this.userList = userDataArray.map((userData:any) => userData.username);

console.log("userList", this.userList);


      });
      this.displayViewlistuserStyle="block"
  
    },
    (error) => {
      console.error(`Error fetching book with ID ${id}:`, error);
    }
  );
}



viewBook(id:any){
  this.displayViewStyle = "block"; 
    
}

}
