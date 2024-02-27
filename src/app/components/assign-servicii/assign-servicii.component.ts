import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { Imagine } from 'src/app/model/Imagine';
import { AssignServiciuRequest } from 'src/app/model/Requests/assign-serviciu-mode';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { Maybe } from 'src/app/model/maybe';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';

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
  public selectedFiles: any[] = [];
  public selectedImages: Imagine[] = [];
  public userDescription: string = "";
  public loadingPublish: boolean = false;

  public serviciuValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public judeteValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public showImagesValidation: boolean = false;
  public showDescriptionValidation: boolean = false

  constructor(private dataService: DataService,
    private router: Router,
    private sharedDataSerice: SharedDataService,
    private dialog: MatDialog){}


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
          }
      }).catch(e => {});
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
    console.log("DESTROY")
    //this.subscription.unsubscribe();
  }

  onFileSelected(event: Event): void {
    this.showImagesValidation = false;
    const input = event.target as HTMLInputElement;
    if (input.files) {
      //this.selectedFile = input.files[0];
      for(var fileIndex=0; fileIndex< input.files.length; fileIndex++){
        this.selectedFiles.push(input.files[fileIndex]);
        this.readFileAsBase64(input.files[fileIndex]);
      }
      console.log("SELECTED FILES")
      console.log(this.selectedFiles)
    }
  }

  onSubmit(): void {
    
  }

  private getFileExtension(fileName: string): string{
    return fileName.split('.').pop() || '';
  }

  readFileAsBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;

      let imagine = new Imagine();
      imagine.fileContentBase64 = base64String;
      imagine.fileExtension = this.getFileExtension(file.name);
      imagine.fileType = file.type;

      this.selectedImages.push(imagine);
    };

    reader.readAsDataURL(file);
  }



  clickCancel(){

  }

  openModal(title: string, message: string): void {
    this.dialog.open(NotificationModalComponent, {
      data: {
        title: title,
        message: message
      }
    });
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
          console.log("REQ SUCCESS")
          
          this.openModal("Success", "Your publish request was executed");
          this.publishDone.emit(true);
          
        }else{
          console.log("REQ FAILED")
          console.log(e.exceptionMessage)
          this.openModal("Failed", "Your publish request failed");
        }
        
        this.loadingPublish = false;
      });
    }
  }

  onDescriptionChange(val:string){
    this.showDescriptionValidation = false;
  }
}
