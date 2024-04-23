
import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SearchModel } from 'src/app/model/search-model';
import { ChatService } from 'src/app/services/chat.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  public menuItemSelected: number = 0;;
  public selectedItemEvent = new EventEmitter<number>();
  public sidebarShow: boolean = false;
  public loggedIn: boolean = false;
  public sidebarShowEvent = new EventEmitter<boolean>();
  public showMessageNotification: boolean = false;
  public isAdmin: boolean = false;
  public settingsItems = 
  {
    "settings": 
    [{
      "name": "Adauga servicii",
      "img": "https://categories.olxcdn.com/assets/categories/olxro/servicii-afaceri-colaborari-619-1x.png"
     },
     {
      "name": "Edit servicii",
      "img": "https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg?s=2048x2048&w=is&k=20&c=H67pTLGapJLgTogGNlD0GMhQN2049N93QrBzreO6_Eo="
     },
     {
      "name": "Account",
      "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
     },
     {
      "name": "Graphics",
      "img": "https://icon-library.com/images/graphics-design-icon/graphics-design-icon-20.jpg"
     },
     {
      "name": "Overview",
      "img": "https://cdn-icons-png.freepik.com/512/4624/4624025.png"
     },
     {
      "name": "Overview admin",
      "img": "https://cdn-icons-png.freepik.com/512/4624/4624025.png"
     },
     {
      "name": "Calendar",
      "img": "https://cdn-icons-png.flaticon.com/512/10691/10691802.png"
     }
    ]
     
  };

  constructor(private router: Router,
    private sharedDataService: SharedDataService,
    private localStorageService: LocalstorageService,
    private chatService: ChatService,
    private loginService: LoginService){
 }

  ngOnInit(){
    firstValueFrom(this.loginService.isAdmin()).then(e => {
      if(e.isSuccess){
        this.isAdmin = e.data;
      }
    })
    this.chatService.getMessageObservable().subscribe(e => {
      this.showMessageNotification = true;
    })
  }

  selectMenuItem(index: number){
    if(index === 0){
      this.router.navigate(["./assign-page"]);
    }else if(index === 1){
      this.router.navigate(["./search-results-page"], { queryParams: { edit: true } });
    }
    else if(index === 2){
      this.router.navigate(["./account-info"]);
    }
    else if(index === 5){
      this.router.navigate(["./overview-admin"]);
    }
  }

  goToMessages(){
    this.showMessageNotification = false;
    this.router.navigate(['./chat']);
  }

  deselectOption(val:boolean){
    if(val){
      this.selectMenuItem(0);
      this.selectedItemEvent.emit(0);
    }
  }


  navigateToSearch(val: SearchModel){
    this.sharedDataService.setServiciuSelectat(val?.serviciuId, val?.serviciuName);
    this.sharedDataService.setJudetselectat(val?.judetId, val?.judetName);
    this.router.navigate(["./search-results-page"]);
  }

  clickLogo(){
    this.router.navigate(["./search-results-page"]);
  }

  closeSidebar(){
    this.sidebarShow = false;
  }

  toggleSidebar(){
    this.sidebarShow = !this.sidebarShow;
    this.sidebarShowEvent.emit(this.sidebarShow);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
}
clickLogout(){
  this.localStorageService.deleteUserData();
  location.reload();
}

clickLogin(){
  this.router.navigate(["./login-page"])
}

clickAccountSettings(){
  this.router.navigate(['./account-settings'])
}
  
}
