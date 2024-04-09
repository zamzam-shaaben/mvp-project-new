import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { WebSocketService } from '../../web-socket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css'
})
export class ChatListComponent implements OnInit {
  chats: any[] = [];

  constructor(
    private chatService: ChatService,
    private webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.chatService.getChats().subscribe((apiResponse: any[]) => {
      // Transform the API response into the structure expected by the frontend
      // Here we directly use 'other_user_name' and 'other_user_email' from the API
      this.chats = apiResponse.map(chat => ({
        user_name: chat.user_name,
        user_email: chat.user_email,
        other_user_name: chat.other_user_name,
        other_user_email: chat.other_user_email,
        messages: [{
          content: chat.last_message_content,
          createdAt: chat.last_message_time
        }],
        chat_id: chat.chat_id // Assuming there's a chat_id field to uniquely identify the chat
      }));
    });

    // Listen for new messages and update the chats array accordingly
    this.webSocketService.onMessage().subscribe((newMessage: any) => {
      const chatIndex = this.chats.findIndex(chat => chat.chat_id === newMessage.chat_id);

      if (chatIndex > -1) {
        // Update the last message for the existing chat
        this.chats[chatIndex].messages[0] = newMessage;
      } else {
        // If it's a new chat, add it to the list
        // This assumes newMessage contains all necessary user and chat information
        // Adjust as necessary based on your WebSocket message structure
        this.chats.push({

          user_name: newMessage.sender_name, // Assuming sender's name is part of the message
          user_email: newMessage.sender_email, // Adjust if sender's email is part of the message
          other_user_name: newMessage.receiver_name, // Adjust based on your message structure
          other_user_email: newMessage.receiver_email,
          messages: [newMessage],
          chat_id: newMessage.chat_id
        });
      }
    });
  }
}
