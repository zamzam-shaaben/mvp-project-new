import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: any;
  private socketUrl = 'http://localhost:6001'; // Your WebSocket server URL

  constructor() {
    this.socket = io(this.socketUrl);
  }

  // Listen for messages
  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  // Send message
  public sendMessage(message: any): void {
    this.socket.emit('message', message);
  }
}
