import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent  implements OnInit{
  messages: any[] = [];
  newMessage: string = '';
  chatId: string | null = null;
  userId: number | null = null; // Assuming you have a way to identify the current user's ID
  receiverId: number = 6; // Placeholder, you'll need to set this appropriately


  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  // ngOnInit(): void {
  //   this.chatId = this.route.snapshot.paramMap.get('chat-id');
  //   if (this.chatId) {
  //     this.chatService.getMessagesForChat(this.chatId).subscribe(messages => {
  //       this.messages = messages.map((message: any) => ({
  //         ...message,
  //         isSender: message.sender_id === this.userId,
  //         senderName: message.sender_id === this.userId ? 'You' : 'Other' // This is a placeholder. You might want to replace 'Other' with logic to get the actual sender's name.
  //       }));
  //     });
  //   }
  // }
  ngOnInit(): void {
    // Correctly use authService to get the current user's ID
    this.userId = this.authService.getCurrentUserId();

    this.chatId = this.route.snapshot.paramMap.get('chat-id');

    if (this.chatId) {
      this.chatService.getMessagesForChat(this.chatId).subscribe(messages => {
        this.messages = messages.map((message: any) => ({
          ...message,
          isSender: message.sender_id === this.userId,
        }));
      });
    }
  }

  sendMessage(): void {
    if (this.chatId && this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.chatId, this.newMessage, this.receiverId).subscribe({
        next: (message) => {
          console.log('Message sent successfully', message);
          this.messages.push(message); // Optionally update the UI with the new message
          this.newMessage = ''; // Clear the input field
        },
        error: (error) => {
          console.error('Error sending message:', error);
        }
      });
    }
  }
  isSender(message: any): boolean {
    // Assuming message.sender_id to compare, adjust according to your data model
    return message.sender_id === this.userId;
  }


}
