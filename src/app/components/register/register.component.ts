
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }


registrationSuccess: boolean = false; 
onSubmit() {
  if (this.registerForm.valid) {
    const user: User = {
      ...this.registerForm.value,
    };

    this.userService.getUsers().subscribe((users) => {
      user.id = users.length + 1; // Use the current array length + 1 as the id
      
      this.userService.createUser(user).subscribe(
        (createdUser) => {
          console.log('User created successfully:', createdUser);
          this.registrationSuccess = true;
          setTimeout(() => {
            this.registrationSuccess = false;
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
