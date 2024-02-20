import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { Imagine } from 'src/app/model/Imagine';
import { AssignServiciuRequest } from 'src/app/model/Requests/assign-serviciu-mode';
import { ImaginiServiciiDescriere } from 'src/app/model/imagine-servicii-descriere';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-add-descrition-images',
  templateUrl: './add-descrition-images.component.html',
  styleUrls: ['./add-descrition-images.component.css']
})
export class AddDescritionImagesComponent {

  public subscription: any;
  public selectedFiles: any[] = [];
  public selectedImages: Imagine[] = [];
  public userDescription: string;
  public loadingPublish: boolean = false;

  constructor(
    private sharedDataService: SharedDataService,
     private dataService: DataService){}

  ngOnInit(){
    // var selector = this.store.pipe(select(selectSelectedServicii));
    // this.subscription = selector.subscribe((value) => {
    //   console.log('GOT VALUE FROM NGRX add-desc coomponent:', value);
    //   //this.servicii = value.servicii;
    // });
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
    request.serviciuId = this.sharedDataService.getServiciuSelectat() as number;
    request.judeteIds = this.sharedDataService.getJudeteSelectate();
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
