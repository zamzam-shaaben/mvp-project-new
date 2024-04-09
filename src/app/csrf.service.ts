import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  constructor(private http: HttpClient) {}

  getCsrfToken() {
    // Replace 'api/csrf-token' with the endpoint to get your CSRF token
    return this.http.get<{ csrfToken: string }>('api/csrf-token');
  }
}
