import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { Message } from 'src/app/model/message';
import { ChatService } from 'src/app/services/chat.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

    public messages: Message[] = [];

    constructor(private chatService: ChatService, private localStorageService: LocalstorageService) {
      this.chatService.getMessageObservable().subscribe((message) => {
          this.messages.push(message);
      });
  }

    sendMessage(): void {
        this.chatService.sendMessage("2412rock@gmail.com", "My msg txt");

    }


    
}
