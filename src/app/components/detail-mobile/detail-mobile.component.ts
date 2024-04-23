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
import { SearchModel } from 'src/app/model/search-model';
import { SaveMessageReq } from 'src/app/model/Requests/save-message-req';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-detail-mobile',
  templateUrl: './detail-mobile.component.html',
  styleUrl: './detail-mobile.component.css'
})
export class DetailMobileComponent {
  public searchResult: FilteredSearchResult;
  public imagini: Imagine[] = [];
  public loading: boolean = true;
  public reviews: DBReviewModel[];
  public showWriteReview: boolean = false;
  public showEditReview: boolean = false;
  public showMessageNotification: boolean = false;
  public userIsLoggedIn: boolean = false;

  constructor(private dataService: DataService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService,
    private router: Router,
    private localStorageService: LocalstorageService,
    private chatService: ChatService){}

  ngOnInit(){
    this.checkUserLoggedIn();
    this.loadData();
    this.chatService.getMessageObservable().subscribe(e => {
      this.showMessageNotification = true;
    })
  }


  goToMessages(){
    this.showMessageNotification = false;
    this.router.navigate(['./chat']);
  }

  resetReviewRights(){
    this.showEditReview = false;
    this.showEditReview = false;
  }

  checkUserLoggedIn(){
    let name = localStorage.getItem("name");
    let loggedInEmail = localStorage.getItem("isEmailLogin");
    let profilePicContent = localStorage.getItem("profilePicContent");

    if(name != null && loggedInEmail != null && profilePicContent != null){
      this.userIsLoggedIn = true;
    }
  }

  checkReviewRights(){
    this.searchResult = this.sharedDataService.getSearchResult();
    let reviewerId = parseInt(this.localStorageService.getUserId());
    firstValueFrom(this.dataService.getReviewOfUser(this.searchResult.userId, this.searchResult.serviciuId, reviewerId)).then(res => {
      var reviewerIsNotReviewee = this.searchResult.userId.toString() != this.localStorageService.getUserId();
      if(reviewerIsNotReviewee && res.data == null && this.userIsLoggedIn){
        this.showWriteReview = true;
      }
      else if(reviewerIsNotReviewee && res.data != null){
        this.showEditReview = true;
      }
    });
  }

  loadData(){
    this.loading = true;
    this.checkReviewRights();
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
    this.loading = true;
    if (!edit) {
      let dialogref = this.modalService.openWriteReviewModal(false, null, null);
      dialogref.afterClosed().subscribe(result => {
        if (result != null) {
          this.postReview(result, false);
          
        }
        this.loading = false;
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
            else if(result === true){
              // delete operation
              firstValueFrom(this.dataService.deleteReview(reviewedId, serviciuId)).then(response => {
                if(!response.isSuccess){
                  this.modalService.openModalNotification("Error", `Could not delete review: ${response.exceptionMessage} `, false);
                }
                this.resetReviewRights();
                this.loadData();
                this.loading = false;
              }).catch(e => {this.modalService.openModalNotification("Error", `Unknown errror`, false); this.loading = false;})
            }
            this.loading = false;
          })
        }
        
      });
    }
  }

  clickSendMsg(){
    
    this.sharedDataService.setNewChatData(this.searchResult.userId, this.searchResult.userName);
    this.router.navigate(['./chat'])
  }

  goBack(){
    this.router.navigate(['./search-results-page']);
  }

  navigateToSearch(val: SearchModel){
    this.sharedDataService.setServiciuSelectat(val?.serviciuId, val?.serviciuName);
    this.sharedDataService.setJudetselectat(val?.judetId, val?.judetName);
    this.router.navigate(["./search-results-page"]);
  }
}
