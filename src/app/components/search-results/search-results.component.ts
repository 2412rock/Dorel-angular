import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  public loading: boolean = true;

  constructor(private dataService: DataService, private sharedDataService: SharedDataService){}

  ngOnInit(){
    firstValueFrom(this.dataService.getServiciiForJudet(this.sharedDataService.getServiciuSelectat() as number, this.sharedDataService.getJudetSelectat() as number, 0)).then(
      reponse => {
        if(reponse.isSuccess){
          
        }
      }
    )
  }

}
