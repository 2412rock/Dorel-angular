import { Component, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-assign-servicii',
  templateUrl: './assign-servicii.component.html',
  styleUrls: ['./assign-servicii.component.css']
})
export class AssignServiciiComponent {
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
  public userDescription: string;
  public loadingPublish: boolean = false;

  constructor(private dataService: DataService,
    private router: Router,
    private sharedDataSerice: SharedDataService){}


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
    var request = new StartsWithRequest();
    request.startsWith = val;
    firstValueFrom(this.dataService.getJudete(request)).then(val => {
      if(val.isSuccess){
        this.judeteSearchResultEventEmitter.emit(val.data);
      }
    })
  }

  clickBack(){
    this.router.navigate(['./account-settings/add-or-edit-sericiu'])
  }
  
  clickNext(){
    if(this.selectedServiciu != null){
      // this.store.dispatch(setSelectedServicii({ selectedServicii }));
      console.log("SERVICUU SELECTAT")
      console.log(this.selectedServiciu)
      console.log(this.selectedServiciu.id)
      this.sharedDataSerice.addServiciuSelectat(this.selectedServiciu.id)
      console.log("JUDETE SELECTAT")
      console.log(this.selectedJudete)
      var map = this.selectedJudete.map(e => e.id);
      console.log(map)
      this.sharedDataSerice.addJudeteSelectate(map);
      this.router.navigate(['./account-settings/add-description-images'])
    }
    console.log("No serviciu selectat")
  }

  ngOnDestroy() {
    console.log("DESTROY")
    //this.subscription.unsubscribe();
  }

  onFileSelected(event: Event): void {
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

  clickPublish(){
    this.loadingPublish = true;
    let request = new AssignServiciuRequest();
    request.serviciuId = this.selectedServiciu?.id as number;
    request.judeteIds = this.selectedJudete.map(e => e.id);
    request.descriere = this.userDescription;
    request.imagini = this.selectedImages;
    firstValueFrom(this.dataService.assignUserServicii(request)).then(e => {
      if(e.isSuccess){
        console.log("REQ SUCCESS")
      }else{
        console.log("REQ FAILED")
        console.log(e.exceptionMessage)
      }
      this.loadingPublish = false;
    });
  }
}
