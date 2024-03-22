import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-sidebar.component.html',
  styleUrl: './settings-sidebar.component.css'
})
export class SettingsSidebarComponent {
  @Output() sideBarEventEmitter = new EventEmitter<number>();
  public displayPlaceholder: boolean = false;
  public profilePicContent: string;
  public selectedItem: number;

  constructor(private http: HttpClient){};

  ngOnInit(){
    let name = localStorage.getItem("name");
    let loggedInEmail = localStorage.getItem("isEmailLogin") === "true" ? true : false;
    let profilePicContent = localStorage.getItem("profilePicContent");

    if(name != null && loggedInEmail != null && profilePicContent != null){
      if(!loggedInEmail){
        this.profilePicContent = profilePicContent;
      }
      else{
        this.displayPlaceholder = this.profilePicContent === "" ? true : false;
      }
    }
    console.log("Profile pic")
    console.log(profilePicContent)
  }

  selectMenuItem(itemIndex: number){
    this.selectedItem = itemIndex;
    this.sideBarEventEmitter.emit(itemIndex);
  }

}
