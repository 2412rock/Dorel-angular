import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { setSelectedServicii } from 'src/app/ngrx/actions';
import { AppState, SelectedServicii } from 'src/app/ngrx/reducer';
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
  public selectedServicii: string[] = [];
  public selectedJudete: string[] = [];
  public serviciiSearchResultEventEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();
  public judeteSearchResultEventEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(private dataService: DataService,
    private router: Router,
    private store: Store<{ app: AppState }>,
    private sharedDataSerice: SharedDataService){}


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
  
  clickNext(){
    const selectedServicii: SelectedServicii = {
      servicii: this.selectedServicii,
      judete: this.selectedJudete,
      remainingServicii: []
    };
    // this.store.dispatch(setSelectedServicii({ selectedServicii }));
    this.sharedDataSerice.addServiciiSelectate(this.selectedServicii)
    this.sharedDataSerice.addJudeteSelectate(this.selectedJudete);
    this.sharedDataSerice.addServiciiLeftToSelect(this.selectedServicii);
    this.router.navigate(['./account-settings/add-description-images'])
  }
}
