import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SearchResult } from './model/search-result';
import { FilteredSearchResult } from './model/filtered-search-result';
import { SharedDataService } from './services/shared-data.service';
import { SearchModel } from './model/search-model';

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

  constructor(private router: Router, private sharedDataService: SharedDataService){}

  checkUserLoggedIn(){
    
  }

  navigateToLoginPage(){
    this.router.navigate(['./login-page'])
  }

  async ngOnInit(){
    this.sharedDataService.loginEventEmitter.subscribe(e =>{
      this.showSearchBar = false;
    })
  //this.router.navigate(["./basic-search-page"]);
  //this.router.navigate(["./account-settings"]);
  this.router.navigate(["search-results-page"]);
  //this.router.navigate(["chat"]);
  //this.router.navigate(["./serviciu-detail-page"]);
 // this.router.navigate(["./serviciu-detail-page"]);
  }

  clickLogo() {
    window.location.reload();
  }

  toggleSidebar(){
    console.log("Toggle")
    this.sidebarShow = !this.sidebarShow;
    console.log("Emit")
   // this.sidebarShowEvent.emit(this.sidebarShow);
  }
  getDataFromSearch(model: SearchModel) {
    this.sharedDataService.eventEmitter.emit(model);
  }

  goToMessages(){
    this.showMessageNotification = false;
    this.router.navigate(['./chat']);
  }
  
}

