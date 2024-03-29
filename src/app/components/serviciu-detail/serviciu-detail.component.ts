import { Component, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Imagine } from 'src/app/model/Imagine';
import { SearchResult } from 'src/app/model/search-result';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-serviciu-detail',
  templateUrl: './serviciu-detail.component.html',
  styleUrl: './serviciu-detail.component.css'
})
export class ServiciuDetailComponent {
  public searchResult: SearchResult;
  public imagini: Imagine[] = [];
  public reviews = [1,2,3,4,5];

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService){}

  ngOnInit(){
    this.searchResult = this.sharedDataService.getSearchResult();
    this.getImagini();
  }

  getImagini(){
    console.log("Get imiagini")
    firstValueFrom(this.dataService.getImaginiForServiciuUser(this.searchResult.serviciuId,this.searchResult.judetId, this.searchResult.userId)).then(response => {
      if(response.isSuccess){
          this.imagini = response.data;
      }
    })
  }

  writeReview(){
    this.modalService.openWriteReviewModal();
  }
}
