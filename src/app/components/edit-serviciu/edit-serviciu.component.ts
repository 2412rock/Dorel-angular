import { Component, EventEmitter, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { Imagine } from 'src/app/model/Imagine';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';

@Component({
  selector: 'app-edit-serviciu',
  templateUrl: './edit-serviciu.component.html',
  styleUrl: './edit-serviciu.component.css'
})
export class EditServiciuComponent {
  @Input() serviciu: DBServiciuModel;

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

  ngOnInit(){
    firstValueFrom(this.dataService.getJudeteForServiciu(this.serviciu.id)).then(response => {
      if(response.isSuccess){
        this.selectedJudete = response.data;
      }
    });
    firstValueFrom(this.dataService.getDescriereForServiciu(this.serviciu.id)).then(response => {
      if(response.isSuccess){
        this.userDescription = response.data;
      }
    });
    firstValueFrom(this.dataService.getImaginiForServiciu(this.serviciu.id)).then(response => {
      if(response.isSuccess){
        this.selectedImages = response.data;
      }
    });
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
      
    }
  }
  
  imagesChanged(imgs: Imagine[]){
    this.selectedImages = imgs;
  }

}
