import { Component, ElementRef, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { firstValueFrom } from 'rxjs';
import { Group, Message } from 'src/app/model/group';
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

  public text: string;
  public groups: Group[];
  public openChat: boolean = false;
  public groupMessages: Message[];
  public myUserId: number;
  public selectedGroup: Group;
  public selectedChat: number;

  @ViewChild('scrollableContent') scrollableContent: ElementRef;


  constructor(private chatService: ChatService,private chatServiceHttp: ChatHttpService ,private localStorageService: LocalstorageService, private sharedDataService: SharedDataService) {
    this.chatService.getMessageObservable().subscribe((message) => {
      console.log("Got message")
      this.groupMessages.push(message);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

    });
  }

  ngOnInit(){
    // firstValueFrom(this.chatServiceHttp.getMessages()).then(response => {
    //   if(response.isSuccess){
    //     response.data.
    //   }
    // })
    this.getMessages();
  }

  getMessages(){
    this.myUserId = parseInt(this.localStorageService.getUserId());
    firstValueFrom(this.chatServiceHttp.getMessages()).then(response => {
      if(response.isSuccess){
        console.log("Got messages")
        var messageUser = this.sharedDataService.getMessageUserId();
        var existingChatWithUser = response.data.filter(e => e.withUser === messageUser);
        this.groups = response.data;
        if(messageUser != undefined && existingChatWithUser.length === 0){
          let group = new Group();
          group.withUser = this.sharedDataService.getMessageUserId();
          group.withUserName = this.sharedDataService.getMessageUserName();
          group.messages = [];
          this.groups.push(group)
          this.selectedChat = this.groups.length - 1;
          this.clickChat(this.groups.length - 1);
        }
        else if(response.data.length === 0){

        }
        
        
      }
    })
  }

  ngOnChanges(){
    this.getMessages();
  }


  async sendMessage() {
    console.log("Send message")
    await this.chatService.sendMessage(this.selectedGroup.withUser, this.text);
    var message = new Message();
    message.messageText = this.text;
    message.receipt = this.selectedGroup.withUser;
    message.senderId = parseInt(this.localStorageService.getUserId());
    this.groupMessages.push(message);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  clickChat(index: number){
    this.openChat = true;
    this.selectedGroup = this.groups[index];
    this.groupMessages = this.groups[index].messages;
    this.selectedChat = index;
  }

  scrollToBottom() {
    // const scrollContainer = this.scrollableContent.nativeElement;
    // scrollContainer.scrollTop = scrollContainer.scrollHeight;

    this.scrollableContent.nativeElement.scrollTop = this.scrollableContent.nativeElement.scrollHeight;

  }

}
