import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/auth.service'; // Import your user service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  userId!: number;
  userDetails: any;
  editForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder) { 
      this.editForm = this.formBuilder.group({
        // Define your form controls here
        username: [''],
        password: ['' ],
        // Add more fields as needed
      });
    }
    userAuthData: any = localStorage.getItem('userAuth');
    parsedUserAuth:any = JSON.parse(this.userAuthData);
   
  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
      console.log(this.parsedUserAuth.data[0].password
        )
      this.userId =this.parsedUserAuth.userId

      console.log(this.parsedUserAuth)

      this.userService.getUserById(this.userId).subscribe((userDetails) => {
        this.userDetails = userDetails;
        console.log(userDetails)
        // this.editForm.patchValue(userDetails);
        this.editForm.patchValue({
          username: userDetails.username,
         
        });
      });
    // });
  }
 updateSuccess: boolean = false; 
 role=this.parsedUserAuth.role
  saveChanges(): void {
    if (this.editForm.valid) {
      const updatedDetails = this.editForm.value;
      console.log(updatedDetails)
      if(!updatedDetails.password){
        updatedDetails.password=this.parsedUserAuth.data[0].password

      }
       updatedDetails.role=this.parsedUserAuth.role
     
      this.userService.updateUserDetails(this.userId, updatedDetails).subscribe(() => {
        // Handle success, e.g., show a success message
      this.updateSuccess=true;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 2000); 
        this.router.navigate(['/adminprofile']);
      });
    }
  }
}
