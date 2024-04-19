import { Component, ElementRef, ViewChild } from '@angular/core';
import { Group, Message } from 'src/app/model/group';
import { ChatService } from 'src/app/services/chat.service';
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

  @ViewChild('scrollableContent') scrollableContent: ElementRef;

  constructor(private shareDataService: SharedDataService, private localStorageService: LocalstorageService,private chatService: ChatService){

  }

  ngOnInit(){
    this.myUserId = parseInt(this.localStorageService.getUserId());
    this.group = this.shareDataService.chatGroup;
    this.groupMessages = this.group.messages;
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  async sendMessage() {
    await this.chatService.sendMessage(this.group.withUser, this.text);
    var message = new Message();
    message.messageText = this.text;
    message.receipt = this.group.withUser;
    message.senderId = parseInt(this.localStorageService.getUserId());
    this.groupMessages.push(message);
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
    this.text = "";
  }

  scrollToBottom() {
    // const scrollContainer = this.scrollableContent.nativeElement;
    // scrollContainer.scrollTop = scrollContainer.scrollHeight;

    this.scrollableContent.nativeElement.scrollTop = this.scrollableContent.nativeElement.scrollHeight;

  }

  handleTouchStart(event: TouchEvent): void {
    event.preventDefault(); // Prevent default touch behavior (like pinch-zooming)
  }
}
