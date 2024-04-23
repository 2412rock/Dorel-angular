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
  public sidebarShow: boolean = false;
  public sidebarShowEvent = new EventEmitter<boolean>();
  public newMessageFrom: number[] = [];

  @ViewChild('scrollableContent') scrollableContent: ElementRef;


  constructor(private router: Router,private chatService: ChatService,private chatServiceHttp: ChatHttpService ,private localStorageService: LocalstorageService, private sharedDataService: SharedDataService) {
    this.chatService.getMessageObservable().subscribe((message) => {
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
    this.newMessageFrom = this.sharedDataService.newMessagsFrom; 
  }

  isNewMessage(index:number){
     var result =  this.sharedDataService.newMessagsFrom.find(e => e == this.groups[index].withUser) != undefined;
     return result;
  }


  getMessages(){
    this.myUserId = parseInt(this.localStorageService.getUserId());
    firstValueFrom(this.chatServiceHttp.getMessages()).then(response => {
      if(response.isSuccess){
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

  toggleSidebar(){
    this.sidebarShow = !this.sidebarShow;
    this.sidebarShowEvent.emit(this.sidebarShow);
  }

  navigateToSearch(val: SearchModel){
    this.sharedDataService.setServiciuSelectat(val?.serviciuId, val?.serviciuName);
    this.sharedDataService.setJudetselectat(val?.judetId, val?.judetName);
    this.router.navigate(["./search-results-page"]);
  }

  clickLogo(){
    this.router.navigate(["./search-results-page"]);
  }

  async sendMessage() {
    await this.chatService.sendMessage(this.selectedGroup.withUser, this.text);
    var message = new Message();
    message.messageText = this.text;
    message.receipt = this.selectedGroup.withUser;
    message.senderId = parseInt(this.localStorageService.getUserId());
    this.groupMessages.push(message);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
    this.text = "";
  }

  clickChat(index: number){
    this.openChat = true;
    this.selectedGroup = this.groups[index];
    this.groupMessages = this.groups[index].messages;
    this.selectedChat = index;
    this.newMessageFrom = this.newMessageFrom.filter(e => e != this.groups[index].withUser);
    this.sharedDataService.newMessagsFrom = this.sharedDataService.newMessagsFrom.filter(e => e != this.groups[index].withUser); 
    firstValueFrom(this.chatServiceHttp.seenMessage(this.groups[index].withUser)).then(e => {})
  }

  scrollToBottom() {
    // const scrollContainer = this.scrollableContent.nativeElement;
    // scrollContainer.scrollTop = scrollContainer.scrollHeight;

    this.scrollableContent.nativeElement.scrollTop = this.scrollableContent.nativeElement.scrollHeight;

  }

}
