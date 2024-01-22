
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Getter methods for easier access to form controls
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { username, password } = this.loginForm.value;
//       this.authService.login(username, password).subscribe((authenticated: any) => {
//         if (authenticated) {
//           // Redirect to appropriate page based on user role (admin/user)
//           this.router.navigate([authenticated ? '/admin' : '/user']);
//         }
//       });
//     }
//   }
// }
isAuthenticated=this.authService.isAuthenticated
loginSuccess:boolean=false
onSubmit() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe((authenticated: any) => {
      console.log(authenticated)
      if (authenticated.isAuthenticated === true && authenticated.role === "admin") {
        // Redirect or perform other actions upon successful login
        localStorage.setItem("userAuth",JSON.stringify(authenticated))
        this.loginSuccess=true;
        setTimeout(() => {
          this.loginSuccess = false;
        }, 2000); 
        this.router.navigate(['/allbooks']);
        location.reload()
        console.log('Login successful!');

      } else if (authenticated.isAuthenticated === true && authenticated.role === "user") {
        this.loginSuccess=true;
        setTimeout(() => {
          this.loginSuccess = false;
        }, 2000); 
        localStorage.setItem("userAuth",JSON.stringify(authenticated))
        this.router.navigate(['/allbooks']);
        location.reload()

        console.log('Login successful!');
      }else{
        console.log("--------------")
        this.router.navigate(['/login']);
      }
    });
  }
}
}