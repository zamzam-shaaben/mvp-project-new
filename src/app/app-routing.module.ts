import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'chatList',
    component : ChatListComponent
  },
  {
    path : 'chats/:chat-id/messages',
    component : ChatMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
