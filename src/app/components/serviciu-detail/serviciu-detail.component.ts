import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DBReviewModel } from 'src/app/model/DBReviewModel';
import { Imagine } from 'src/app/model/Imagine';
import { PostReviewModel } from 'src/app/model/Requests/post-review-model';
import { FilteredSearchResult } from 'src/app/model/filtered-search-result';
import { SearchResult } from 'src/app/model/search-result';
import { DataService } from 'src/app/services/data.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ReviewData } from '../write-review-modal/write-review-modal.component';

@Component({
  selector: 'app-serviciu-detail',
  templateUrl: './serviciu-detail.component.html',
  styleUrl: './serviciu-detail.component.css'
})
export class ServiciuDetailComponent {
  public searchResult: FilteredSearchResult;
  public imagini: Imagine[] = [];
  public loading: boolean = true;
  public reviews: DBReviewModel[];
  public showWriteReview: boolean = true;

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService,
    private router: Router,
    private localStorageService: LocalstorageService){}

  ngOnInit(){
    this.searchResult = this.sharedDataService.getSearchResult();
    if(this.searchResult.userId.toString() != this.localStorageService.getUserId()){
      this.showWriteReview = true;
    }
    this.loadData();
  }

  loadData(){
    this.loading = true;
    firstValueFrom(this.dataService.getImaginiForServiciuUser(this.searchResult.serviciuId,this.searchResult.judetIds[0], this.searchResult.userId)).then(response => {
      if(response.isSuccess){
          this.imagini = response.data;
          firstValueFrom(this.dataService.getReviews(this.searchResult.userId, this.searchResult.serviciuId, 0)).then(response => {
            if(response.isSuccess){
              response.data.forEach(e => {
                if(e.reviewerUserId.toString() === this.localStorageService.getUserId()){
                  this.showWriteReview = false;
                }
              })
              this.reviews = response.data;
            }
            else{
              this.modalService.openModalNotification("Failed", `Failed to load data:${response.exceptionMessage}`, false);
            }
            this.loading = false;
          }).catch(e => {
            this.loading = false;
            this.modalService.openModalNotification("Failed", `Unkown error occured`, false);
          });
      }else{
        this.loading = false;
        this.modalService.openModalNotification("Failed", `Failed to load data:${response.exceptionMessage}`, false);
      }
    }).catch(e => {this.modalService.openModalNotification("Failed", `Unkown error occured`, false); this.loading = false;})
  }

  private postReview(result: ReviewData, edit: boolean) {
    var request = new PostReviewModel();
    request.description = result.description;
    request.rating = result.rating;
    request.reviwedUserId = this.searchResult.userId;
    request.serviciuId = this.searchResult.serviciuId;

    if(!edit){
      firstValueFrom(this.dataService.postReview(request)).then(response => {
        if (response.isSuccess) {
          this.loadData();
        }
        else {
          this.modalService.openModalNotification("Failed", `Failed to post review ${response.exceptionMessage}`, false);
        }
  
      }).catch(e => { this.modalService.openModalNotification("Failed", "Unknown error occured", false); });
    }
    else{
      firstValueFrom(this.dataService.editReview(request)).then(response => {
        if (response.isSuccess) {
          this.loadData();
        }
        else {
          this.modalService.openModalNotification("Failed", `Failed to post review ${response.exceptionMessage}`, false);
        }
  
      }).catch(e => { this.modalService.openModalNotification("Failed", "Unknown error occured", false); });
    }
    
  }

  writeReview(edit: boolean) {
    if (!edit) {
      let dialogref = this.modalService.openWriteReviewModal(false, null, null);
      dialogref.afterClosed().subscribe(result => {
        if (result != null) {
          this.postReview(result, false);
        }
      });
    }else{
      var reviewedId = this.searchResult.userId; 
      var serviciuId = this.searchResult.serviciuId; 
      var reviewerId = parseInt(this.localStorageService.getUserId());

      firstValueFrom(this.dataService.getReviewOfUser(reviewedId, serviciuId, reviewerId)).then(reviewResponse => {
        if(reviewResponse.isSuccess){
          let dialogref = this.modalService.openWriteReviewModal(true, reviewResponse.data.reviewDescription, reviewResponse.data.rating);
          dialogref.afterClosed().subscribe(result => {
            if(result instanceof ReviewData){
              this.postReview(result, true);
            }
            else if(result != null){
              // delete operation
            }
          })
        }
        
      });
    }
  }

  goBack(){
    this.router.navigate(['./search-results-page']);
  }
}
