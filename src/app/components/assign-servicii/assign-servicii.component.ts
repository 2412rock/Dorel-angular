import { Component, EventEmitter, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { Imagine } from 'src/app/model/Imagine';
import { AssignServiciuRequest } from 'src/app/model/Requests/assign-serviciu-mode';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-assign-servicii',
  templateUrl: './assign-servicii.component.html',
  styleUrls: ['./assign-servicii.component.css']
})
export class AssignServiciiComponent {
  @Output() publishDone = new EventEmitter<boolean>();
  public isToggleEnabled: boolean;
  public searchTermServiciu: string;
  public selectedServiciu: DBServiciuModel | null;
  public alreadySelectedServicii: DBServiciuModel[];
  public selectedJudete: DBJudetModel[] = [];
  public serviciiSearchResultEventEmitter: EventEmitter<DBServiciuModel[]> = new EventEmitter<DBServiciuModel[]>();
  public judeteSearchResultEventEmitter: EventEmitter<DBJudetModel[]> = new EventEmitter<DBJudetModel[]>();

  public subscription: any;
  public selectedImages: Imagine[] = [];
  public userDescription: string = "";
  public loadingPublish: boolean = false;
  public pageReady: boolean = false;

  public serviciuValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public judeteValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public showImagesValidation: boolean = false;
  public showDescriptionValidation: boolean = false

  constructor(private dataService: DataService,private modalService: ModalService){}


  ngOnInit(){
    this.loadServiciiAlreadyOferite();
  }

  removeSelectedJudet(val: DBJudetModel){
    this.selectedJudete = this.selectedJudete.filter(e => e.id !== val.id);
  }

  removeSelectedServiciu(){
    this.selectedServiciu = null;
  }

  getSelectedValueServicii(element: DBServiciuModel){

    this.selectedServiciu = element;
  }

  getSelectedValueJudete(element: DBJudetModel){
    this.selectedJudete.push(element);
  }

  getServiciuTypedValue(val: string){
    this.serviciuValidationErrorEmitter.emit(false);
    var request = new StartsWithRequest();
    request.startsWith = val;
    firstValueFrom(this.dataService.getServicii(request)).then(val => {
      if(val.isSuccess){
        this.serviciiSearchResultEventEmitter.emit(val.data);
      }
    }); 
  }

  loadServiciiAlreadyOferite(){
    firstValueFrom(this.dataService.getServiciiForUser()).then(res => {
          if(res.isSuccess){
            this.alreadySelectedServicii = res.data;
            this.pageReady = true;
          }
      }).catch(e => {this.modalService.openModalNotification('Error', 'Something went wrong loading the menu', false); this.publishDone.emit(true);});
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

  ngOnDestroy() {
  }

  changeImages(imgs: Imagine[]){
    this.selectedImages = imgs;
  }


  clickCancel(){

  }

  private validationPassed(): boolean{
    let result: boolean = true;
    if(this.selectedServiciu == null){
      result = false;
      this.serviciuValidationErrorEmitter.emit(true);
    }
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
      let request = new AssignServiciuRequest();
      request.serviciuId = this.selectedServiciu?.id as number;
      request.judeteIds = this.selectedJudete.map(e => e.id);
      request.descriere = this.userDescription;
      request.imagini = this.selectedImages;
      firstValueFrom(this.dataService.assignUserServicii(request)).then(e => {
        if(e.isSuccess){
          this.modalService.openModalNotification("Success", "Your data has been succesfully published!", true);
          this.publishDone.emit(true);
          
        }else{
          this.modalService.openModalNotification("Failed", `An error has occured: ${e.exceptionMessage}`, false);
        }
        
        this.loadingPublish = false;
      }).catch(e => { this.modalService.openModalNotification("Failed", `An unknown error has occured`, false); this.loadingPublish = false;});
    }
  }

  onDescriptionChange(val:string){
    this.showDescriptionValidation = false;
  }
}
