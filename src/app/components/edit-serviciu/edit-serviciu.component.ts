import { Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { Imagine } from 'src/app/model/Imagine';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { AssignServiciuRequest } from 'src/app/model/Requests/assign-serviciu-mode';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SearchModel } from 'src/app/model/search-model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-edit-serviciu',
  templateUrl: './edit-serviciu.component.html',
  styleUrl: './edit-serviciu.component.css'
})
export class EditServiciuComponent {
  public serviciu: DBServiciuModel;

  public pageReady: boolean = true;
  public judeteValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public judeteSearchResultEventEmitter: EventEmitter<DBJudetModel[]> = new EventEmitter<DBJudetModel[]>();
  public selectedJudete: DBJudetModel[] = [];
  public showImagesValidation: boolean = false;
  public selectedImages: Imagine[] = [];
  public selectedFiles: any[] = [];
  public showDescriptionValidation: boolean = false

  public isToggleEnabled: boolean;
  public searchTermServiciu: string;
  public subscription: any;
  public userDescription: string = "";
  public loadingPublish: boolean = false;
  public loadingDelete: boolean = false;
  public loading: boolean = true;
  public sidebarShow: boolean = false;
  public sidebarShowEvent = new EventEmitter<boolean>();
  public showMessageNotification: boolean = false;

  public serviciuValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private dataService: DataService,
    private modalService: ModalService,
    private sharedDataService: SharedDataService,
    private location: Location,
    private router: Router,
    private chatService: ChatService,){}
    
    goToMessages(){
      this.showMessageNotification = false;
      this.router.navigate(['./chat']);
    }
    
  ngOnInit(){
    this.serviciu =  this.sharedDataService.getServiciuToEdit();
    this.getData();
    this.chatService.getMessageObservable().subscribe(e => {
      this.showMessageNotification = true;
    })
  }

  ngOnChanges(){
    this.getData();
  }

  getData(){
    this.loading = true;
    firstValueFrom(this.dataService.getJudeteForServiciu(this.serviciu.id)).then(response => {
      if(response.isSuccess){
        this.selectedJudete = response.data;
        firstValueFrom(this.dataService.getDescriereForServiciu(this.serviciu.id)).then(response => {
          if(response.isSuccess){
            this.userDescription = response.data;
            firstValueFrom(this.dataService.getImaginiForServiciu(this.serviciu.id, this.serviciu.ofer)).then(response => {
              if(response.isSuccess){
                this.selectedImages = response.data;
                this.loading = false;
              }
              else{
                this.loading = false;
                this.modalService.openModalNotification("Couldnt load data", response.exceptionMessage, false);
                //this.publishDone.emit(true);
                this.router.navigate(['./account-settings'])
              }
            }).catch(e => { this.modalService.openModalNotification("Couldnt load data", "An unknown error has occured3", false);this.router.navigate(['./account-settings'])});;
          }
          else{
            this.loading = false;
            this.modalService.openModalNotification("Couldnt load data", response.exceptionMessage, false);
            //this.publishDone.emit(true);
          }
        }).catch(e => { this.modalService.openModalNotification("Couldnt load data", "An unknown error has occured2", false);this.router.navigate(['./account-settings'])});;
      }
      else{
        this.loading = false;
        this.modalService.openModalNotification("Couldnt load data", response.exceptionMessage, false);
        //this.publishDone.emit(true);
      }
    }).catch(e => { this.modalService.openModalNotification("Couldnt load data", "An unknown error has occured1", false);this.router.navigate(['./account-settings'])});
  }

  getSelectedValueJudete(element: DBJudetModel){
    this.selectedJudete.push(element);
  }

  getJudetTypedValue(val: string){
    this.judeteValidationErrorEmitter.emit(false);
    var request = new StartsWithRequest();
    request.startsWith = val;
    firstValueFrom(this.dataService.getJudete(request)).then(val => {
      if(val.isSuccess){
        this.judeteSearchResultEventEmitter.emit(val.data);
      }
    })
  }

  removeSelectedJudet(val: DBJudetModel){
    this.selectedJudete = this.selectedJudete.filter(e => e.id !== val.id);
  }


  onDescriptionChange(val:string){
    this.showDescriptionValidation = false;
  }

  private validationPassed(): boolean{
    let result: boolean = true;

    if(this.selectedJudete.length == 0){
      result = false;
      this.judeteValidationErrorEmitter.emit(true);
    }
    if(this.selectedImages.length == 0){
      result = false;
      this.showImagesValidation = true;
    }
    if(this.userDescription.length < 80){
      result = false;
      this.showDescriptionValidation = true;
    }
    return result;
  }

  clickLogo(){
    this.router.navigate(["./search-results-page"]);
  }

  clickPublish(){
    if(this.validationPassed()){
      this.loadingPublish = true;
      var editRequest = new AssignServiciuRequest();
      editRequest.descriere = this.userDescription;
      editRequest.imagini = this.selectedImages;
      editRequest.judeteIds = this.selectedJudete.map(e => e.id);
      editRequest.serviciuId = this.serviciu.id;

      firstValueFrom(this.dataService.editUserServicii(editRequest)).then(response => {
        if(response.isSuccess){
          var modal = this.modalService.openModalNotification("Success", "Your data has been succesfully published!", true);
          //this.publishDone.emit(true);
          modal.afterClosed().subscribe(result => {this.location.back();});
          
          
        }else{
          this.modalService.openModalNotification("Failed", `An error has occured: ${response.exceptionMessage}`, false);
        }
        this.loadingPublish = false;
      }).catch(e => { this.modalService.openModalNotification("Failed", `An unknown error has occured`, false); this.loadingPublish = false;});
      ;
    }
  }

  clickDelete(){
    this.loadingDelete = true;
    var dialogref = this.modalService.openConfirmationModal("Confirm delete", "Are you sure you want to delete this service?");
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        firstValueFrom(this.dataService.deleteUserServicii(this.serviciu.id, this.serviciu.ofer)).then(response => {
          if(response.isSuccess){
            let dialogref = this.modalService.openModalNotification("Success", "Serviciu deleted succesfully", true);
            dialogref.afterClosed().subscribe(result => {this.location.back();});
            //this.publishDone.emit(true);
            this.location.back();
          }
          else{
            this.modalService.openModalNotification("Failed", `Failed to delete service ${response.exceptionMessage}`, false);
          }
          this.loadingDelete = false;
        }).catch(e => {this.modalService.openModalNotification("Failed", "Unknown error occured. Please try again", false); this.loadingDelete = false; });
      }
      this.loadingDelete = false;
    });
  }

  clickCancel(){
    //this.publishDone.emit(true);
    this.location.back();
    
  }
  
  imagesChanged(imgs: Imagine[]){
    this.selectedImages = imgs;
  }

  navigateToSearch(val: SearchModel){
    this.sharedDataService.setServiciuSelectat(val?.serviciuId, val?.serviciuName);
    this.sharedDataService.setJudetselectat(val?.judetId, val?.judetName);
    this.router.navigate(["./search-results-page"]);
  }
  closeSidebar(){
    this.sidebarShow = false;
  }

  toggleSidebar(){
    this.sidebarShow = !this.sidebarShow;
    this.sidebarShowEvent.emit(this.sidebarShow);
  }

}
