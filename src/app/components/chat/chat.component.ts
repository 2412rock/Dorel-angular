import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { Message } from 'src/app/model/message';
import { ChatService } from 'src/app/services/chat.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

    public messages: Message[] = [];
    public text: string;

    constructor(private chatService: ChatService, private localStorageService: LocalstorageService, private sharedDataService: SharedDataService) {
      this.chatService.getMessageObservable().subscribe((message) => {
          this.messages.push(message);
      });
  }

    sendMessage(): void {
      var to = this.sharedDataService.getNewChatData();
        this.chatService.sendMessage(to, this.text);

    }


    
}
