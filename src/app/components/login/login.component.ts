import {  Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userCredentials = { email: '', password: '' };


  constructor(private authService: AuthService, private router: Router) { }

  // login(): void {
  //   if (this.userCredentials.email && this.userCredentials.password) {
  //     this.authService.login(this.userCredentials).subscribe(
  //       response => {
  //         console.log('Login successful', response);
  //         this.router.navigate(['/profile']);
  //         // Handle response and navigate or show success message
  //       },
  //       error => {
  //         console.error('Login failed', error);
  //         // Handle error and show error message
  //       }
  //     );
  //   }
  // }
  login(): void {
    if (this.userCredentials.email && this.userCredentials.password) {
      this.authService.login(this.userCredentials).subscribe(
        response => {
          console.log('Login successful', response);
          // No need to handle token storage here, as it's already done within the AuthService
          this.router.navigate(['/chatList']); // Navigate to the profile page on success
        },
        error => {
          console.error('Login failed', error);
          // Here, you should handle the error, perhaps by showing a message to the user
          // This could be done through a notification service or directly setting an error message state that can be displayed in the template
        }
      );
    }
  }
}




