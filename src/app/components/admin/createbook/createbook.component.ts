// // createbook.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../../services/book.service'; // Replace with the actual path
import {Books} from "../../../interfaces/books"
import { Router } from '@angular/router';
@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css'],
})
export class CreatebookComponent {
  createBookForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private bookService: BookService,private router: Router) {
    this.createBookForm = this.formBuilder.group({
      authorName: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
 
  userAuthData:any = localStorage.getItem('userAuth');
  parsedUserAuth = JSON.parse(this.userAuthData);
role=this.parsedUserAuth.role

  creatbooksccess: boolean = false; 
  onSubmit() {
    if (this.createBookForm.valid) {
      // const formData = this.createBookForm.value;
const data:Books={
  ...this.createBookForm.value
}
this.bookService.getBooks().subscribe((bookData) => {

  data.id = bookData.length + 1;
  data.status="available";
  data.userId=this.parsedUserAuth.userId
  data.users=[]
console.log(data)
  this.bookService.createBook(data).subscribe(
    (createBook) => {
      console.log('User created successfully:', createBook);
     this.creatbooksccess=true
     this.router.navigate(['/allbooks']);
     setTimeout(() => {
      this.creatbooksccess = false;
    }, 5000); 
      // Add any additional logic or navigation after successful user creation
    },
    (error) => {
      console.error('Error creating user:', error);
      // Handle error appropriately
    }
  );
});
    }
  
  }

  

}
