import { Component, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { FilteredSearchResult } from 'src/app/model/filtered-search-result';
import { SearchModel } from 'src/app/model/search-model';
import { SearchResult } from 'src/app/model/search-result';
import { ChatHttpService } from 'src/app/services/chat-http.service';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import {Platform, PlatformModule} from '@angular/cdk/platform';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
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
  public cautMester: boolean = true;
  public selectedDropDownvalue: number = 0;
  public dropDownValuesSearch = ['Cauta mesteri', 'Cauta job'];
  public dropdownValuesEdit = ['Servicii oferite', 'Caut mester']

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalstorageService,
    private chatService: ChatService,
    private chatHttpService: ChatHttpService,
    private platform: Platform
    
  ) { }

    goToMessages(){
      this.showMessageNotification = false;
      this.router.navigate(['./chat']);
    }

  ngOnInit() {
    
    this.sharedDataService.eventEmitter.subscribe(model => {
      this.getDataFromSearch(model);
    })
    this.checkIfLoggedIn();
    this.searchResults = [];
    this.filteredSearchResults = [];
    this.route.queryParams.subscribe(params => {
      const edit = params['edit'];

      if (edit) {
        this.editServicii = true;
      }
    });


    if (this.editServicii) {
      this.loadData(undefined, undefined, 0, this.cautMester);
    }
    else {
      this.serviciuName = this.sharedDataService.getServiciuName();
      this.judetName = this.sharedDataService.getJudetName();
      this.loadData(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0, this.cautMester);
    }
    this.chatService.getMessageObservable().subscribe(e => {
      this.showMessageNotification = true;
    })
  }

  dropDownValueChange(itemIndex: number){
    this.selectedDropDownvalue = itemIndex;
    if(itemIndex === 0){
      this.cautMester = true;
      this.loadData(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0, true)
    }
    else{
      this.cautMester = false;
      this.loadData(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0, false)
    }
  }


  checkIfLoggedIn(){
    let name = localStorage.getItem("name");
    let loggedInEmail = localStorage.getItem("isEmailLogin");
    let profilePicContent = localStorage.getItem("profilePicContent");

    if(name != null && loggedInEmail != null && profilePicContent != null){
      this.loggedIn = true;
    }
  }

  private filterSearchResults() {
    for (let index = 0; index < this.searchResults.length; index++) {
      if (this.filteredSearchResults.filter(e => e.serviciuId === this.searchResults[index].serviciuId && e.userId === this.searchResults[index].userId).length === 0) {
        var elementsWithSameServId = this.searchResults.filter(e => e.serviciuId === this.searchResults[index].serviciuId);
        var filteredSearchResult = new FilteredSearchResult();
        filteredSearchResult.judetIds = [];
        filteredSearchResult.judetNames = [];
        filteredSearchResult.descriere = this.searchResults[index].descriere;
        filteredSearchResult.imagineCover = this.searchResults[index].imagineCover;
        filteredSearchResult.serviciuId = this.searchResults[index].serviciuId;
        filteredSearchResult.serviciuName = this.searchResults[index].serviciuName;
        filteredSearchResult.starsAverage = this.searchResults[index].starsAverage;
        filteredSearchResult.userId = this.searchResults[index].userId;
        filteredSearchResult.userEmail = this.searchResults[index].userEmail;
        filteredSearchResult.userName = this.searchResults[index].userName;
        filteredSearchResult.numberOfReviews = this.searchResults[index].numberOfReviews;
        filteredSearchResult.ofer = this.searchResults[index].ofer;
        filteredSearchResult.email = this.searchResults[index].email;
        filteredSearchResult.phone = this.searchResults[index].phone;

        elementsWithSameServId.forEach(e => {
          filteredSearchResult.judetIds.push(e.judetId);
          filteredSearchResult.judetNames.push(e.judetName);
        });
        this.filteredSearchResults.push(filteredSearchResult);
      }
    }    
  }

  loadData(serviciuId: number | undefined, judetId: number | undefined, pageNumber: number, cautMester: boolean) {
    this.searchResults = [];
    this.filteredSearchResults = [];
    this.loading = true;
    if (this.editServicii) {
      firstValueFrom(this.dataService.getServiciiForUserAsSearchResults(cautMester)).then(response => {
        if (response.isSuccess) {
          console.log(response)
          response.data.forEach(searchResult => {
            this.searchResults.push(searchResult);
          });
          console.log(this.searchResults)
        }
        else {
          this.modalService.openModalNotification("Error", `Something went wrong loading data: ${response.exceptionMessage}`, false);
          
        }
        this.filterSearchResults();
        this.loading = false;;
      }).catch(e => { this.modalService.openModalNotification("Error", `Something went wrong loading data`, false); this.loading = false;});
    }
    else {
      firstValueFrom(this.dataService.getSearchResult(serviciuId, judetId, pageNumber, cautMester)).then(
        response => {
          if (response.isSuccess) {
            response.data.forEach(searchResult => {
              this.searchResults.push(searchResult);
            });
            this.filterSearchResults();
            this.loading = false;
          }
          else {
            this.modalService.openModalNotification("Failed", `Failed to retrieve data: ${response.exceptionMessage}`, false);
            
            this.loading = false;
          }
        }
      ).catch(e => { this.modalService.openModalNotification("Unknown error", `Failed to retrieve data`, false); this.loading = false;})
    }
  }

  getDataFromSearch(model: SearchModel) {
    this.editServicii = false;
    this.serviciuName = model.serviciuName;
    this.judetName = model.judetName;
    this.sharedDataService.setServiciuSelectat(model.serviciuId, model.serviciuName);
    this.sharedDataService.setJudetselectat(model?.judetId, model?.judetName);
    this.loadData(model?.serviciuId, model.judetId, 0, this.cautMester);
  }

  handleClickCard(searchResult: FilteredSearchResult) {
    console.log(searchResult)
    if (this.editServicii) {
      var serviciu = new DBServiciuModel();
      serviciu.id = searchResult.serviciuId;
      serviciu.name = searchResult.serviciuName;
      serviciu.ofer = searchResult.ofer;
      console.log(searchResult.ofer)
      this.sharedDataService.setServiciuToEdit(serviciu);
      this.router.navigate(["./edit-serviciu-page"]);
    }
    else {
      this.sharedDataService.setSearchResult(searchResult);
      //
      //this.router.navigate(["./detail-mobile"])
      if(this.platform.ANDROID || this.platform.IOS){
        this.router.navigate(["./detail-mobile"]);
      }
      else{
        this.router.navigate(["./serviciu-detail-page"], {
          queryParams: { ofer: this.cautMester }
        });
      }
      
    }
  }

  clickLogo() {
    window.location.reload();
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
