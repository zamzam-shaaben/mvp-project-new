import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8000/api/chats';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getChats(): Observable<any[]> {
    const token = this.authService.getToken(); // Retrieve the stored token
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any[]>('http://localhost:8000/api/chats', { headers });
  }

  getMessagesForChat(chatId: string): Observable<any> {
    const token = this.authService.getToken(); // Retrieve the stored token
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any[]>(`${this.apiUrl}/${chatId}/messages`,{ headers });
  }

  sendMessage(chatId: string, content: string, receiverId: number): Observable<any> {
    const token = this.authService.getToken(); // Retrieve the stored token
    const headers = { 'Authorization': `Bearer ${token}` };
    const url = `${this.apiUrl}/${chatId}/messages`; // Construct the URL
    const body = { content, receiver_id: receiverId }; // Construct the body
    return this.http.post<any>(url, body, { headers });
  }
}
