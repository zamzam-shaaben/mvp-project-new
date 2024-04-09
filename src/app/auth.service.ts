import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { }
  private apiUrl = environment.apiUrl;
  private loginUrl = 'http://localhost:8000/api/login'; // Your API login URL
  private currentUserValue = { id: 1 };

  constructor(private http: HttpClient) { }
  getCurrentUserId(): number {
    // Logic to retrieve the current user's ID from your auth system
    return this.currentUserValue.id;
  }

//   login(credentials: { email: string, password: string }): Observable<any> {
//     const headers = new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     });
//     console.log(credentials);
//     return this.http.post('http://localhost:8000/api/login', credentials, { headers });
// }

login(credentials: { email: string, password: string }): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  return this.http.post<any>(this.loginUrl, credentials, { headers }).pipe(
    tap((response: any) => { // Using `any` to assert the type of response
      // Now TypeScript will not complain about accessing `.token`
      if (response && response.token) {
        localStorage.setItem('authToken', response.token); // Store the token
      }
    }),
    catchError(error => {
      console.error('Login request failed', error);
      return throwError(() => new Error('Login request failed'));
    })
  );
}

// Function to retrieve the stored token
getToken(): string | null {
  return localStorage.getItem('authToken');
}

logout(): void {
  localStorage.removeItem('authToken');
  // Optionally, add logic to redirect the user or inform them of the logout
}

  signup(userCredentials: any): Observable<any> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      });
      return this.http.post('http://localhost:8000/api/register', userCredentials, { headers });
  }
}
