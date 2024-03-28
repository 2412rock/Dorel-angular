import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Imagine } from 'src/app/model/Imagine';
import { SearchResult } from 'src/app/model/search-result';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-serviciu-detail',
  templateUrl: './serviciu-detail.component.html',
  styleUrl: './serviciu-detail.component.css'
})
export class ServiciuDetailComponent {
  public searchResult: SearchResult;
  public imagini: Imagine[] = [];

  constructor(private dataService: DataService,private sharedDataService: SharedDataService){}

  ngOnInit(){
    this.searchResult = this.sharedDataService.getSearchResult();
    this.getImagini();
  }

  getImagini(){
    console.log("Get imiagini")
    firstValueFrom(this.dataService.getImaginiForServiciuUser(this.searchResult.serviciuId,this.searchResult.judetId, this.searchResult.userId)).then(response => {
      console.log("got imagini")
      console.log(response)
      if(response.isSuccess){
          this.imagini = response.data;
      }
    })
  }
}
