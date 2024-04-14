import { Component, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { FilteredSearchResult } from 'src/app/model/filtered-search-result';
import { SearchModel } from 'src/app/model/search-model';
import { SearchResult } from 'src/app/model/search-result';
import { DataService } from 'src/app/services/data.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


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

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalstorageService) { }

  ngOnInit() {
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
      this.loadData(undefined, undefined, 0, true);
    }
    else {
      this.serviciuName = this.sharedDataService.getServiciuName();
      this.judetName = this.sharedDataService.getJudetName();

      this.loadData(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0, false);

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
    console.log("Search results")
    console.log(this.searchResults)
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
        filteredSearchResult.userName = this.searchResults[index].userName;
        filteredSearchResult.numberOfReviews = this.searchResults[index].numberOfReviews;

        elementsWithSameServId.forEach(e => {
          filteredSearchResult.judetIds.push(e.judetId);
          filteredSearchResult.judetNames.push(e.judetName);
        });
        this.filteredSearchResults.push(filteredSearchResult);
      }
    }

    console.log("Filtered")
    console.log(this.filteredSearchResults)
    
  }

  loadData(serviciuId: number | undefined, judetId: number | undefined, pageNumber: number, edit: boolean) {
    this.searchResults = [];
    this.filteredSearchResults = [];
    this.loading = true;
    if (this.editServicii) {
      firstValueFrom(this.dataService.getServiciiForUserAsSearchResults()).then(response => {
        if (response.isSuccess) {
          response.data.forEach(searchResult => {
            this.searchResults.push(searchResult);
          });
        }
        else {
          this.modalService.openModalNotification("Error", `Something went wrong loading data: ${response.exceptionMessage}`, false);
          this.router.navigate(['./account-settings']);
          
        }
        this.filterSearchResults();
        this.loading = false;;
      }).catch(e => { this.modalService.openModalNotification("Error", `Something went wrong loading data`, false); this.loading = false;this.router.navigate(['./account-settings']); });
    }
    else {
      firstValueFrom(this.dataService.getSearchResult(serviciuId, judetId, pageNumber)).then(
        response => {
          if (response.isSuccess) {
            response.data.forEach(searchResult => {
              console.log("Pushing data")
              this.searchResults.push(searchResult);
            });
            this.filterSearchResults();
            this.loading = false;
          }
          else {
            this.modalService.openModalNotification("Failed", `Failed to retrieve data: ${response.exceptionMessage}`, false);
            this.router.navigate(['./account-settings']);
            this.loading = false;
          }
        }
      ).catch(e => { this.modalService.openModalNotification("Unknown error", `Failed to retrieve data`, false); this.loading = false; this.router.navigate(['./account-settings']);})
    }
  }

  getDataFromSearch(model: SearchModel) {
    this.editServicii = false;
    this.serviciuName = model.serviciuName;
    this.judetName = model.judetName;
    this.sharedDataService.setServiciuSelectat(model.serviciuId, model.serviciuName);
    this.sharedDataService.setJudetselectat(model?.judetId, model?.judetName);
    this.loadData(model?.serviciuId, model.judetId, 0, false);
  }

  handleClickCard(searchResult: FilteredSearchResult) {
    if (this.editServicii) {
      var serviciu = new DBServiciuModel();
      serviciu.id = searchResult.serviciuId;
      serviciu.name = searchResult.serviciuName;
      this.sharedDataService.setServiciuToEdit(serviciu);
      this.router.navigate(["./edit-serviciu-page"]);
    }
    else {
      this.sharedDataService.setSearchResult(searchResult);
      this.router.navigate(["./serviciu-detail-page"]);
    }
  }

  clickLogo() {
    window.location.reload();
  }

  closeSidebar(){
    this.sidebarShow = false;
  }

  toggleSidebar(){
    console.log("Toggle")
    this.sidebarShow = !this.sidebarShow;
    console.log("Emit")
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
