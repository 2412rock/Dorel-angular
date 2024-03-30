import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DBReviewModel } from 'src/app/model/DBReviewModel';
import { Imagine } from 'src/app/model/Imagine';
import { PostReviewModel } from 'src/app/model/Requests/post-review-model';
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
    this.loadData();
  }

  loadData(){
    this.loading = true;
    firstValueFrom(this.dataService.getImaginiForServiciuUser(this.searchResult.serviciuId,this.searchResult.judetId, this.searchResult.userId)).then(response => {
      if(response.isSuccess){
          this.imagini = response.data;
          firstValueFrom(this.dataService.getReviews(this.searchResult.userId, this.searchResult.serviciuId, 0)).then(response => {
            if(response.isSuccess){
              this.reviews = response.data;
            }
            this.loading = false;
          }).catch(e => this.loading = false);
      }else{
        this.loading = false;
        this.modalService.openModalNotification("Failed", `Failed to load data:${response.exceptionMessage}`, false);
      }
    }).catch(e => {this.modalService.openModalNotification("Failed", `Unkown error occured`, false); this.loading = false;})
  }

  writeReview(){
    let dialogref = this.modalService.openWriteReviewModal();
    dialogref.afterClosed().subscribe(result => {
      if (result != null) {
        var request = new PostReviewModel();
        request.description = result.description;
        request.rating = result.rating;
        request.reviwedUserId = this.searchResult.userId;
        request.serviciuId = this.searchResult.serviciuId;

        firstValueFrom(this.dataService.postReview(request)).then(response => {
          if(response.isSuccess){
            this.loadData();
          }
          else{
            this.modalService.openModalNotification("Failed", `Failed to post review ${response.exceptionMessage}`, false);
          }

        }).catch(e => {this.modalService.openModalNotification("Failed", "Unknown error occured", false); });
      }
    });
  }

  goBack(){
    this.router.navigate(['./search-results-page']);
  }
}
