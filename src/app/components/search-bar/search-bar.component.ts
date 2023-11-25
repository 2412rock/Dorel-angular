import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  textInputControlServicii = new FormControl('');
  textInputControlLocation = new FormControl('');
  public filteredResultsServicii: string[];
  public filteredResultsLocatie: string[];
  public dropdownServiciiVisible: boolean = false;
  public dropdownLocationVisible: boolean = false;
  public selectedService: string;
  public selectedLocation: string;

  constructor(private dataService: DataService, private router: Router) { }

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
      let values: string[] = [];
      dataValues.forEach(e => {
        values.push(e.name);
      });
      this.filteredResultsServicii = values;
    })
  }

  filterResultsLocatie(startsWith: string){
    var req = new StartsWithRequest();
    req.startsWith = startsWith;
    firstValueFrom(this.dataService.getJudete(req)).then(e => {
      let dataValues = e.data as DBJudetModel[];
      let values: string[] = [];
      dataValues.forEach(e => {
        values.push(e.name);
      });
      this.filteredResultsLocatie = values;
    })  }

  clickClearServicii(){
    this.textInputControlServicii.reset();
    this.dropdownServiciiVisible = false;
  }

  clickClearLocatie(){
    this.textInputControlLocation.reset();
    this.dropdownLocationVisible = false;
  }

  selectService(val: string){
    this.selectedService = val;
    this.textInputControlServicii.setValue(val);
    this.dropdownServiciiVisible = false;
  }

  selectLocationval(val:string){
    this.selectedLocation = val;
    this.textInputControlLocation.setValue(val);
    this.dropdownLocationVisible = false;
  }

  clickSearch(){
    this.router.navigate(["./search-results-page"])
  }
}
