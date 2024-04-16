import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-with-user-menu-item',
  templateUrl: './chat-with-user-menu-item.component.html',
  styleUrl: './chat-with-user-menu-item.component.css'
})
export class ChatWithUserMenuItemComponent {
  @Input() chatWithUsername: string;
  public profilePic: string;
  @Input() lastMessage: string;
}
