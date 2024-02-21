import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
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
}
