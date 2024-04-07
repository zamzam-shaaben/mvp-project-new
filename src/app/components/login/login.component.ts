import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userCredentials = { email: '', password: '' };

  constructor(private authService: AuthService) { }

  login(): void {
    if (this.userCredentials.email && this.userCredentials.password) {
      this.authService.login(this.userCredentials).subscribe(
        response => {
          console.log('Login successful', response);
          // Handle response and navigate or show success message
        },
        error => {
          console.error('Login failed', error);
          // Handle error and show error message
        }
      );
    }
  }
}




