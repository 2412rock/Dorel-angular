import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DBReviewModel } from 'src/app/model/DBReviewModel';
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
  public loading: boolean = true;
  public reviews: DBReviewModel[];

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService,
    private router: Router){}

  ngOnInit(){
    this.searchResult = this.sharedDataService.getSearchResult();
    this.getImagini();
    this.getReviews();
  }

  getImagini(){
    console.log("Get imiagini")
    firstValueFrom(this.dataService.getImaginiForServiciuUser(this.searchResult.serviciuId,this.searchResult.judetId, this.searchResult.userId)).then(response => {
      if(response.isSuccess){
          this.imagini = response.data;
          this.loading = false;
      }else{
        this.loading = false;
        this.modalService.openModalNotification("Failed", `Failed to load data:${response.exceptionMessage}`, false);
      }
    }).catch(e => {this.modalService.openModalNotification("Failed", `Unkown error occured`, false); this.loading = false;})
  }

  getReviews(){
    this.loading = true;
    firstValueFrom(this.dataService.getReviews(this.searchResult.userId, this.searchResult.serviciuId, 0)).then(response => {
      if(response.isSuccess){
        this.reviews = response.data;
      }
      this.loading = false;
    }).catch(e => this.loading = false)
  }

  writeReview(){
    this.modalService.openWriteReviewModal();
  }

  goBack(){
    this.router.navigate(['./search-results-page']);
  }
}
