import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { }
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



  login(credentials: { email: string, password: string }): Observable<any> {
    // Directly using the full URL for the login endpoint
    return this.http.post('http://localhost:8000/api/login', credentials);
  }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //     withCredentials: true, // Important for sessions and CSRF tokens
  //   };

  //   // Adjust the URL as needed to match your application's endpoint
  //   return this.http.post('http://localhost:8000/login', credentials, httpOptions);
  // }

  signup(userCredentials: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/register', userCredentials);
  }
}
