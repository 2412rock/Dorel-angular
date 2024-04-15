import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  user: string;
    message: string;
    messages: [string, string][] = [];

    constructor(private chatService: ChatService) {
      this.chatService.getMessageObservable().subscribe(([user, message]) => {
          this.messages.push([user, message]);
      });
  }

    sendMessage(): void {
        this.chatService.sendMessage(this.user, this.message);
        this.message = '';
    }


    
}
