import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService){}

  ngOnInit(){
    firstValueFrom(this.dataService.getServiciiForJudet(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0)).then(
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
