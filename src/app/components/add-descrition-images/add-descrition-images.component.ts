import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import { Imagine } from 'src/app/model/Imagine';
import { AssignServiciuRequest } from 'src/app/model/Requests/assign-serviciu-mode';
import { ImaginiServiciiDescriere } from 'src/app/model/imagine-servicii-descriere';
import { AppState, SelectedServicii } from 'src/app/ngrx/reducer';
import { selectSelectedServicii } from 'src/app/ngrx/selectors';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-add-descrition-images',
  templateUrl: './add-descrition-images.component.html',
  styleUrls: ['./add-descrition-images.component.css']
})
export class AddDescritionImagesComponent {

  public subscription: any;
  public servicii: string[] = [];
  public serviciiSelected: string[] = [];
  public selectedFiles: any[] = [];
  public selectedImages: Imagine[] = [];
  public userDescription: string;
  public serviciiLeft: string[] = [];

  constructor(private store: Store<{ app: AppState }>,
     private route: ActivatedRoute,
     private router: Router,
     private sharedDataService: SharedDataService,
     private dataService: DataService){}

  ngOnInit(){
    // var selector = this.store.pipe(select(selectSelectedServicii));
    // this.subscription = selector.subscribe((value) => {
    //   console.log('GOT VALUE FROM NGRX add-desc coomponent:', value);
    //   //this.servicii = value.servicii;
    // });
    console.log("SERVICII LEFT")
    console.log(this.sharedDataService.getServiciiLeftToSelect())
    this.servicii = this.sharedDataService.getServiciiLeftToSelect();
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

  updateSelectedServicii(val: string){
    if(this.serviciiSelected.find(e => e === val)){
      // remove value 
      this.serviciiSelected = this.serviciiSelected.filter(e => e !== val);
    }
    else{
      this.serviciiSelected.push(val);
    }
    this.updateServiciiLeftToSelect();
  }

  private updateServiciiLeftToSelect(){
    this.serviciiLeft = [];
    for(let element of this.servicii){
      if(!this.serviciiSelected.includes(element)){
        // check if serviciu was selected; if it was not selected, pass it next screen
        this.serviciiLeft.push(element);
      }
    }
  }

  private addServiciiAndImagini(){
    var isd = new ImaginiServiciiDescriere();
    isd.imagini = this.selectedImages;
    isd.servicii = this.serviciiSelected;
    isd.descriere = this.userDescription;
    this.sharedDataService.addImaginiServiciiDescriere(isd);
  }

  clickNext(){
    this.sharedDataService.addServiciiLeftToSelect(this.serviciiSelected);
    this.addServiciiAndImagini();
    this.sharedDataService.setData("next");
  }

  clickCancel(){
    this.sharedDataService.resetAll();
  }

  clickPublish(){
    this.addServiciiAndImagini();
    let request = new AssignServiciuRequest();
    request.servicii = this.sharedDataService.getServiciiSelectate();
    request.judete = this.sharedDataService.getJudeteSelectate();
    request.serviciiAndImagini = this.sharedDataService.getImaginiServiciiDescriere();
    firstValueFrom(this.dataService.assignUserServicii(request)).then(e => {
      if(e.isSuccess){
        console.log("REQ SUCCESS")
      }else{
        console.log("REQ FAILED")
        console.log(e.exceptionMessage)
      }
    });
  }
}
