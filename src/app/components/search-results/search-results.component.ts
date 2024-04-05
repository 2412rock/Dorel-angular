import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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
  public loading: boolean = true;
  public searchResults: SearchResult[] = [];
  public serviciuName: string | undefined;
  public judetName: string | undefined;

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService,
    private router: Router){}

  ngOnInit(){
    this.serviciuName = this.sharedDataService.getServiciuName();
    this.judetName = this.sharedDataService.getJudetName();
    console.log(this.serviciuName)
    console.log(this.judetName)
    this.loadData(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0);
  }

  loadData(serviciuId: number | undefined, judetId: number | undefined, pageNumber: number){
    this.searchResults = [];
    this.loading = true;
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

  getDataFromSearch(model: SearchModel){
    this.serviciuName = model.serviciuName;
    this.judetName = model.judetName;
    this.sharedDataService.setServiciuSelectat(model.serviciuId, model.serviciuName);
    this.sharedDataService.setJudetselectat(model?.judetId, model?.judetName);
    this.loadData(model?.serviciuId, model.judetId, 0);
  }

  handleClickCard(searchResult: SearchResult){
    this.sharedDataService.setSearchResult(searchResult);
    this.router.navigate(["./serviciu-detail-page"]);
  }
}
