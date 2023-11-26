import { Component, EventEmitter } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-assign-servicii',
  templateUrl: './assign-servicii.component.html',
  styleUrls: ['./assign-servicii.component.css']
})
export class AssignServiciiComponent {
  public isToggleEnabled: boolean;
  public searchTermServiciu: string;
  public searchResultServiciu: string[] = ["alo" ,"alo2"];
  public selectedServicii: string[] = [];
  public selectedJudete: string[] = [];
  public serviciiSearchResultEventEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();
  public judeteSearchResultEventEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private dataService: DataService){}


  removeSelectedJudet(val: string){
    this.selectedJudete = this.selectedJudete.filter(e => e !== val);
  }

  removeSelectedServiciu(val: string){
    this.selectedServicii = this.selectedServicii.filter(e => e !== val);
  }

  getSelectedValueServicii(element: string){
    this.selectedServicii.push(element);
  }

  getSelectedValueJudete(element: string){
    this.selectedJudete.push(element);
  }

  getServiciuTypedValue(val: string){
    var request = new StartsWithRequest();
    request.startsWith = val;
    firstValueFrom(this.dataService.getServicii(request)).then(val => {
      if(val.isSuccess){
        var arr: string[] = [];
        for(var item of val.data as DBServiciuModel[]){
          arr.push(item.name);
        }
        this.serviciiSearchResultEventEmitter.emit(arr);
      }
    }); 
  }

  getJudetTypedValue(val: string){
    var request = new StartsWithRequest();
    request.startsWith = val;
    firstValueFrom(this.dataService.getJudete(request)).then(val => {
      if(val.isSuccess){
        var arr: string[] = [];
        for(var item of val.data as DBJudetModel[]){
          arr.push(item.name);
        }
        this.judeteSearchResultEventEmitter.emit(arr);
      }
    })
  }

}
