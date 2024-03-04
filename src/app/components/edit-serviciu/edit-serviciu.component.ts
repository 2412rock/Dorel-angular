import { Component, EventEmitter } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { Imagine } from 'src/app/model/Imagine';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-serviciu',
  templateUrl: './edit-serviciu.component.html',
  styleUrl: './edit-serviciu.component.css'
})
export class EditServiciuComponent {
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


  public serviciuValidationErrorEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private dataService: DataService){}

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
      
    }
  }

}
