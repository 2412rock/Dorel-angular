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

@Component({
  selector: 'app-edit-serviciu',
  templateUrl: './edit-serviciu.component.html',
  styleUrl: './edit-serviciu.component.css'
})
export class EditServiciuComponent {
  @Input() serviciu: DBServiciuModel;
  @Output() publishDone = new EventEmitter<boolean>();

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


  public serviciuValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private dataService: DataService, private modalService: ModalService){}

  ngOnInit(){
    this.getData();
  }

  ngOnChanges(){
    console.log("Changes")
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
            firstValueFrom(this.dataService.getImaginiForServiciu(this.serviciu.id)).then(response => {
              if(response.isSuccess){
                this.selectedImages = response.data;
                this.loading = false;
              }
              else{
                this.loading = false;
                this.modalService.openModalNotification("Couldnt load data", response.exceptionMessage, false);
              }
            }).catch(e => { this.modalService.openModalNotification("Couldnt load data", "An unknown error has occured", false);});;
          }
          else{
            this.loading = false;
            this.modalService.openModalNotification("Couldnt load data", response.exceptionMessage, false);
          }
        }).catch(e => { this.modalService.openModalNotification("Couldnt load data", "An unknown error has occured", false);});;
      }
      else{
        this.loading = false;
        this.modalService.openModalNotification("Couldnt load data", response.exceptionMessage, false);
      }
    }).catch(e => { this.modalService.openModalNotification("Couldnt load data", "An unknown error has occured", false);});
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
    if(this.userDescription.length == 0){
      result = false;
      this.showDescriptionValidation = true;
    }
    return result;
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
          this.modalService.openModalNotification("Success", "Your data has been succesfully published!", true);
          this.publishDone.emit(true);
          
        }else{
          this.modalService.openModalNotification("Failed", `An error has occured: ${response.exceptionMessage}`, false);
        }
        this.loadingPublish = false;
      }).catch(e => { this.modalService.openModalNotification("Failed", `An unknown error has occured`, false); this.loadingPublish = false;});
      ;
    }
  }

  clickDelete(){
    var dialogref = this.modalService.openConfirmationModal("Confirm delete", "Are you sure you want to delete this service?");
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirm button was pressed');
        // Handle the confirmation action
      } else if (!result) {
        console.log('Cancel button was pressed');
        // Handle the cancel action
      }
    });
  }
  
  imagesChanged(imgs: Imagine[]){
    this.selectedImages = imgs;
  }

}
