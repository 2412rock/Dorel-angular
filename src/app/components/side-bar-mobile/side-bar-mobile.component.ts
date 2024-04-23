import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-bar-mobile',
  templateUrl: './side-bar-mobile.component.html',
  styleUrl: './side-bar-mobile.component.css'
})
export class SideBarMobileComponent {
  @Input() sidebarShowChange:EventEmitter<boolean>;
  public sidebarShow: boolean;
  public loggedIn: boolean = false;
  @Output() sideBarClose = new EventEmitter<void>();
  public showMessageNotification:boolean = false;

  constructor(private localStorageService: LocalstorageService, private router: Router, private location: Location){}

  ngOnInit(){
    this.checkIfLoggedIn();
    this.sidebarShowChange.subscribe(val => {
      this.sidebarShow = val;
    })
  }

  goToMessages() {
    this.sidebarShow = false;
    this.router.navigate(['./chat-list-mobile'])
  }

  checkIfLoggedIn(){
    let name = localStorage.getItem("name");
    let loggedInEmail = localStorage.getItem("isEmailLogin");
    let profilePicContent = localStorage.getItem("profilePicContent");

    if(name != null && loggedInEmail != null && profilePicContent != null){
      this.loggedIn = true;
    }
  }

  closeSidebar(){
    this.sidebarShow = false;
    this.sideBarClose.emit();
  }

  toggleSidebar(){
    this.sidebarShow = !this.sidebarShow;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
}
clickLogout(){
  this.localStorageService.deleteUserData();
  location.reload();
  this.sideBarClose.emit();
}

clickLogin(){
  this.router.navigate(["./login-page"])
  this.sideBarClose.emit();
  this.sidebarShow = false;
}

clickAccountSettings(){
  this.router.navigate(['./account-settings'])
  this.sideBarClose.emit();
  this.sidebarShow = false;
}

clickBack(){
  this.sideBarClose.emit();
  this.sidebarShow = false;
  this.location.back();
}
}
