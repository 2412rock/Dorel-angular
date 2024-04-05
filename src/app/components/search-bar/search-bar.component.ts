import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { SearchModel } from 'src/app/model/search-model';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchClickEvent = new EventEmitter<SearchModel>();
  textInputControlServicii = new FormControl('');
  textInputControlLocation = new FormControl('');
  public filteredResultsServicii: DBServiciuModel[] = [];
  public filteredResultsLocatie: DBJudetModel[];
  public dropdownServiciiVisible: boolean = false;
  public dropdownLocationVisible: boolean = false;
  public selectedService: string;
  public selectedLocation: string;
  public selectedServiciu: DBServiciuModel | null;
  public selectedJudet: DBJudetModel | null;
  @ViewChild('serviciuSearchInput', { static: true }) serviciuSearchInput: ElementRef;
  @ViewChild('judetSearchInput', { static: true }) judetSearchInput: ElementRef;

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
      console.log("Data values")
      console.log(dataValues)
      this.filteredResultsServicii = dataValues;
    }).catch(e => {console.log(e)})
  }

  filterResultsLocatie(startsWith: string){
    var req = new StartsWithRequest();
    req.startsWith = startsWith;
    firstValueFrom(this.dataService.getJudete(req)).then(e => {
      let dataValues = e.data as DBJudetModel[];
      this.filteredResultsLocatie = dataValues;
    });}

  clickClearServicii(){
    this.filteredResultsServicii = [];
    this.textInputControlServicii.reset();
    this.dropdownServiciiVisible = false;
    this.selectedServiciu = null;
  }

  clickClearLocatie(){
    this.filteredResultsLocatie = [];
    this.textInputControlLocation.reset();
    this.dropdownLocationVisible = false;
    this.selectedJudet = null;
  }

  selectService(serviciu: DBServiciuModel){
    this.selectedService = serviciu.name;
    this.textInputControlServicii.setValue(serviciu.name);
    this.dropdownServiciiVisible = false;
    this.selectedServiciu = serviciu;

  }

  selectJudet(judet: DBJudetModel){
    this.selectedLocation = judet.name;
    this.textInputControlLocation.setValue(judet.name);
    this.dropdownLocationVisible = false;
    this.selectedJudet = judet;
  }

  clickSearch(){
    if(this.selectedServiciu != null || this.selectedJudet != null){
      var model = new SearchModel();
      model.serviciuId = this.selectedServiciu?.id;
      model.judetId = this.selectedJudet?.id;
      model.serviciuName = this.selectedServiciu?.name;
      model.judetName = this.selectedJudet?.name;
      this.searchClickEvent.emit(model);
    } 
  }

  getServiciuInputWidth(): number {
    return this.serviciuSearchInput.nativeElement.offsetWidth;
  }

  getJudetInputWidth(): number {
    return this.judetSearchInput.nativeElement.offsetWidth;
  }
}
