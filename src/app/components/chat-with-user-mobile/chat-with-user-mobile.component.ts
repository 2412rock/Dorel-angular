import { Component } from '@angular/core';
import { Group, Message } from 'src/app/model/group';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-chat-with-user-mobile',
  templateUrl: './chat-with-user-mobile.component.html',
  styleUrl: './chat-with-user-mobile.component.css'
})
export class ChatWithUserMobileComponent {
  public groupMessages: Message[];
  public group: Group;
  public myUserId: number;
  public text: string;

  constructor(private shareDataService: SharedDataService, private localStorageService: LocalstorageService){

  }

  ngOnInit(){
    this.myUserId = parseInt(this.localStorageService.getUserId());
    this.group = this.shareDataService.chatGroup;
    this.groupMessages = this.group.messages;
    
  }

  sendMessage(){

  }
}
