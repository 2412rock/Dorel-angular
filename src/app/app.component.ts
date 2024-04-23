import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SearchResult } from './model/search-result';
import { FilteredSearchResult } from './model/filtered-search-result';
import { SharedDataService } from './services/shared-data.service';
import { SearchModel } from './model/search-model';
import { ChatService } from './services/chat.service';
import { firstValueFrom } from 'rxjs';
import { ChatHttpService } from './services/chat-http.service';
import { AccessLogsService } from './services/access-logs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loading: boolean = false;
  public searchResults: SearchResult[] = [];
  public serviciuName: string | undefined;
  public judetName: string | undefined;
  public editServicii: boolean | undefined;
  public filteredSearchResults: FilteredSearchResult[] = [];
  public sidebarShow: boolean = false;
  public loggedIn: boolean = false;
  public sidebarShowEvent = new EventEmitter<boolean>();
  public showMessageNotification: boolean = false;
  public showSearchBar: boolean = true;
  public userLoggedIn: boolean = false;
  

  constructor(private router: Router,
    private sharedDataService: SharedDataService,
    private chatService: ChatService,
    private chatHttpService: ChatHttpService,
    private accessLogsService: AccessLogsService) { }

  navigateToLoginPage() {
    this.router.navigate(['./login-page'])
  }

  async ngOnInit() {
    firstValueFrom(this.accessLogsService.addLog()).then(e => {})
    this.checkUserLoggedIn()
    this.sharedDataService.loginEventEmitter.subscribe(e => {
      this.showSearchBar = false;
    })
    //this.router.navigate(["./basic-search-page"]);
    //this.router.navigate(["./account-settings"]);
    this.router.navigate(["search-results-page"]);
    //this.router.navigate(["chat"]);
    //this.router.navigate(["./serviciu-detail-page"]);
    // this.router.navigate(["./serviciu-detail-page"]);
    this.checkForMessageNotifications();
  }

  checkForMessageNotifications(){
    if(this.userLoggedIn){
      this.chatService.getMessageObservable().subscribe(e => {
      
        this.showMessageNotification = true;
        this.sharedDataService.newMessagsFrom.push(e.senderId)
      })
      firstValueFrom(this.chatHttpService.hasSeenMessages()).then(e => {
        if(e.isSuccess){
          this.showMessageNotification = e.data.length > 0;
          e.data.forEach(e => {
            this.sharedDataService.newMessagsFrom.push(e);
          })
        } 
      })
    }
  }

  checkUserLoggedIn(){
    let name = localStorage.getItem("name");
    let loggedInEmail = localStorage.getItem("isEmailLogin");
    let profilePicContent = localStorage.getItem("profilePicContent");

    if(name != null && loggedInEmail != null && profilePicContent != null){
      this.userLoggedIn = true;
    }
  }

  clickLogo() {
    window.location.reload();
  }

  toggleSidebar() {
    this.sidebarShow = !this.sidebarShow;
    this.sidebarShowEvent.emit(this.sidebarShow);
  }
  getDataFromSearch(model: SearchModel) {
    this.sharedDataService.eventEmitter.emit(model);
    this.router.navigate(['./search-results-page'])
  }

  sideBarClose(){
    this.sidebarShow = false;
  }

  goToMessages() {
    this.showMessageNotification = false;
    this.router.navigate(['./chat']);
  }

}

