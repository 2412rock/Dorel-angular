import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-with-user-menu-item',
  templateUrl: './chat-with-user-menu-item.component.html',
  styleUrl: './chat-with-user-menu-item.component.css'
})
export class ChatWithUserMenuItemComponent {
  @Input() chatWithUsername: string;
  public profilePic: string = "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
  @Input() lastMessage: string;
}
