import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchClickEvent = new EventEmitter<boolean>();
  textInputControlServicii = new FormControl('');
  textInputControlLocation = new FormControl('');
  public filteredResultsServicii: DBServiciuModel[];
  public filteredResultsLocatie: DBJudetModel[];
  public dropdownServiciiVisible: boolean = false;
  public dropdownLocationVisible: boolean = false;
  public selectedService: string;
  public selectedLocation: string;

  constructor(private dataService: DataService, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.textInputControlServicii.valueChanges.subscribe(value => {
      if(value != null){
        this.dropdownServiciiVisible = true;
        this.filterResultsServicii(value);
      }
      var str = value as string;
      if(str.length == 0 || str.trim().length == 0){
        this.dropdownServiciiVisible = false;
      }
    });
    this.textInputControlLocation.valueChanges.subscribe(value => {
      if(value != null){
        this.dropdownLocationVisible = true;
        this.filterResultsLocatie(value);
      }
      var str = value as string;
      if(str.length == 0 || str.trim().length == 0){
        this.dropdownLocationVisible = false;
      }
    });
  }

  filterResultsServicii(startsWith: string){
    var req = new StartsWithRequest();
    req.startsWith = startsWith;
    firstValueFrom(this.dataService.getServicii(req)).then(e => {
      let dataValues = e.data as DBServiciuModel[];
      
      this.filteredResultsServicii = dataValues;
    })
  }

  filterResultsLocatie(startsWith: string){
    var req = new StartsWithRequest();
    req.startsWith = startsWith;
    firstValueFrom(this.dataService.getJudete(req)).then(e => {
      let dataValues = e.data as DBJudetModel[];
      this.filteredResultsLocatie = dataValues;
    });}

  clickClearServicii(){
    this.textInputControlServicii.reset();
    this.dropdownServiciiVisible = false;
  }

  clickClearLocatie(){
    this.textInputControlLocation.reset();
    this.dropdownLocationVisible = false;
  }

  selectService(serviciu: DBServiciuModel){
    this.selectedService = serviciu.name;
    this.textInputControlServicii.setValue(serviciu.name);
    this.dropdownServiciiVisible = false;
    this.sharedDataService.setServiciuSelectat(serviciu.id);

  }

  selectJudet(judet: DBJudetModel){
    this.selectedLocation = judet.name;
    this.textInputControlLocation.setValue(judet.name);
    this.dropdownLocationVisible = false;
    this.sharedDataService.setJudetselectat(judet.id);
  }

  clickSearch(){
    this.searchClickEvent.emit(true);
  }
}
