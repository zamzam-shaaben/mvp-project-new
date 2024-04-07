import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userCredentials = { name: '', email: '', password: '', password_confirmation: '' };

  constructor(private authService: AuthService) { }

  signup(): void {
    this.authService.signup(this.userCredentials).subscribe(
      response => {
        console.log('Signup successful', response);
        // Navigate to login or show success message
      },
      error => {
        console.error('Signup failed', error);
        // Display error message
      }
    );
  }
}
