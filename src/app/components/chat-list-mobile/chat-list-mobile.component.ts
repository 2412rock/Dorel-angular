import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, Subject } from '@microsoft/signalr';
import { firstValueFrom } from 'rxjs';
import { Group, Message } from 'src/app/model/group';
import { SearchModel } from 'src/app/model/search-model';
import { ChatHttpService } from 'src/app/services/chat-http.service';
import { ChatService } from 'src/app/services/chat.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-chat-list-mobile',
  templateUrl: './chat-list-mobile.component.html',
  styleUrl: './chat-list-mobile.component.css'
})
export class ChatListMobileComponent {
  public text: string;
  public groups: Group[];
  public openChat: boolean = false;
  public groupMessages: Message[];
  public myUserId: number;
  public selectedGroup: Group;
  public selectedChat: number;
  public sidebarShow: boolean = false;
  public sidebarShowEvent = new EventEmitter<boolean>();
  public newMessageFrom: number[] = [];

  constructor(private router: Router,private chatService: ChatService,private chatServiceHttp: ChatHttpService ,private localStorageService: LocalstorageService, private sharedDataService: SharedDataService) {
    this.chatService.getMessageObservable().subscribe((message) => {
      console.log("Got message")
      this.groupMessages.push(message);
      // setTimeout(() => {
      //   this.scrollToBottom();
      // }, 100);

    });
  }

  ngOnInit(){
    // firstValueFrom(this.chatServiceHttp.getMessages()).then(response => {
    //   if(response.isSuccess){
    //     response.data.
    //   }
    // })
    this.getMessages();
    this.newMessageFrom = this.sharedDataService.newMessagsFrom; 
  }

  isNewMessage(index:number){
    console.log(this.sharedDataService.newMessagsFrom)
    console.log(this.groups[index].withUser)
     var result =  this.sharedDataService.newMessagsFrom.find(e => e == this.groups[index].withUser) != undefined;
     console.log(result)
     return result;
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
          //this.clickChat(this.groups.length - 1);
        }
        else if(response.data.length === 0){

        }
        
        
      }
    })
  }

  clickChat(index: number){
    this.sharedDataService.chatGroup = this.groups[index];
    this.router.navigate(['./chat-with-mobile'])
  }
}
