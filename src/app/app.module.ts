import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
// import Echo from 'laravel-echo';

// declare global {
//   interface Window { Echo: any; }
// }
// window.Echo = window.Echo || {};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    ChatListComponent,
    ChatMessagesComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor() {
  //   // Initialize Echo
  //   window.Echo = new Echo({
  //     broadcaster: 'pusher',
  //     key: 'local', // Use your own key for production
  //     wsHost: window.location.hostname,
  //     wsPort: 6001,
  //     disableStats: true,
  //     forceTLS: false // Use true if you're using SSL
  //   });
  // }

}
