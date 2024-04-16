import { Component } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { firstValueFrom } from 'rxjs';
import { Group } from 'src/app/model/group';
import { Message } from 'src/app/model/message';
import { ChatHttpService } from 'src/app/services/chat-http.service';
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
  public groups: Group[];
  constructor(private chatService: ChatService,private chatServiceHttp: ChatHttpService ,private localStorageService: LocalstorageService, private sharedDataService: SharedDataService) {
    this.chatService.getMessageObservable().subscribe((message) => {
      this.messages.push(message);
    });
  }

  ngOnInit(){
    // firstValueFrom(this.chatServiceHttp.getMessages()).then(response => {
    //   if(response.isSuccess){
    //     response.data.
    //   }
    // })
    firstValueFrom(this.chatServiceHttp.getMessages()).then(response => {
      if(response.isSuccess){
        this.groups = response.data;
      }
    })
  }


  sendMessage(): void {
    var to = this.sharedDataService.getNewChatData();
    this.chatService.sendMessage(to, this.text);

  }



}
