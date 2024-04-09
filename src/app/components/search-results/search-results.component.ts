import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { SearchModel } from 'src/app/model/search-model';
import { SearchResult } from 'src/app/model/search-result';
import { DataService } from 'src/app/services/data.service';
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
  public editServicii: boolean;

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      console.log("GOT PARAMS")
      const edit = params['edit'];
      console.log(edit)
      if(edit){
        this.editServicii = true;
      }
      // Use productId as needed
    });
    if(this.editServicii){
      this.loadData(undefined, undefined, 0, true);
    }
    else{
      this.serviciuName = this.sharedDataService.getServiciuName();
      this.judetName = this.sharedDataService.getJudetName();
      if(this.judetName != null || this.serviciuName != null){
        this.loadData(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0, false);
      }
    }
  }

  loadData(serviciuId: number | undefined, judetId: number | undefined, pageNumber: number, edit: boolean){
    this.searchResults = [];
    this.loading = true;
    if(this.editServicii){
      firstValueFrom(this.dataService.getServiciiForUserAsSearchResults()).then(response => {
        if(response.isSuccess){
          response.data.forEach(searchResult => {
            this.searchResults.push(searchResult);
          });
        }
        else{
          this.modalService.openModalNotification("Error", `Something went wrong loading data: ${response.exceptionMessage}`, false);
        }
        this.loading = false;;
      }).catch(e => {this.modalService.openModalNotification("Error", `Something went wrong loading data`, false); this.loading = false;});
    }
    else{
      firstValueFrom(this.dataService.getSearchResult(serviciuId, judetId, pageNumber)).then(
        response => {
          if(response.isSuccess){
            response.data.forEach(searchResult => {
                this.searchResults.push(searchResult);
              });
            this.loading = false;
          }
          else{
            this.modalService.openModalNotification("Failed", `Failed to retrieve data: ${response.exceptionMessage}`, false);
            this.loading = false;
          }
        }
      ).catch(e => {this.modalService.openModalNotification("Unknown error", `Failed to retrieve data`, false);this.loading = false;})
    }
  }

  getDataFromSearch(model: SearchModel){
    this.editServicii = false;
    this.serviciuName = model.serviciuName;
    this.judetName = model.judetName;
    this.sharedDataService.setServiciuSelectat(model.serviciuId, model.serviciuName);
    this.sharedDataService.setJudetselectat(model?.judetId, model?.judetName);
    this.loadData(model?.serviciuId, model.judetId, 0, false);
  }

  handleClickCard(searchResult: SearchResult){
    if(this.editServicii){
      var serviciu = new DBServiciuModel();
      serviciu.id = searchResult.serviciuId;
      serviciu.name = searchResult.serviciuName;
      this.sharedDataService.setServiciuToEdit(serviciu);
      this.router.navigate(["./edit-serviciu-page"]);
    }
    else{
      this.sharedDataService.setSearchResult(searchResult);
      this.router.navigate(["./serviciu-detail-page"]);
    }
  }
}
