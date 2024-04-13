import { Component, EventEmitter, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { Imagine } from 'src/app/model/Imagine';
import { AssignServiciuRequest } from 'src/app/model/Requests/assign-serviciu-mode';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { Location } from '@angular/common';
import { SearchModel } from 'src/app/model/search-model';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Router } from '@angular/router';

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
  public showDescriptionValidation: boolean = false;
  public sidebarShow: boolean = false;
  public sidebarShowEvent = new EventEmitter<boolean>();

  constructor(private dataService: DataService,
    private modalService: ModalService,
    private location: Location,
    private sharedDataService: SharedDataService,
    private router: Router){}


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
          else{
            this.modalService.openModalNotification('Error', `Cant load data ${res.exceptionMessage}`, false);
            this.publishDone.emit(true);
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
    this.location.back();
  }

  navigateToSearch(val: SearchModel){
    this.sharedDataService.setServiciuSelectat(val?.serviciuId, val?.serviciuName);
    this.sharedDataService.setJudetselectat(val?.judetId, val?.judetName);
    this.router.navigate(["./search-results-page"]);
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
      let request = new AssignServiciuRequest();
      request.serviciuId = this.selectedServiciu?.id as number;
      request.judeteIds = this.selectedJudete.map(e => e.id);
      request.descriere = this.userDescription;
      request.imagini = this.selectedImages;
      firstValueFrom(this.dataService.assignUserServicii(request)).then(e => {
        if(e.isSuccess){
          var dialogref = this.modalService.openModalNotification("Success", "Your data has been succesfully published!", true);
          dialogref.afterClosed().subscribe(result => {this.location.back();});
          
          
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

  closeSidebar(){
    this.sidebarShow = false;
  }

  toggleSidebar(){
    console.log("Toggle")
    this.sidebarShow = !this.sidebarShow;
    console.log("Emit")
    this.sidebarShowEvent.emit(this.sidebarShow);
  }
}
