import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  textInputControlServicii = new FormControl('');
  textInputControlLocation = new FormControl('');
  public mockValuesServicii: string[] = ["Electrician", "Instalator", "Menajera", "Abc", "Aaaa"];
  public mockValuesLocatie: string[] = ["Arad", "Deva", "Timisoara", "Bucuresti", "Cluj"];
  public filteredResultsServicii: string[];
  public filteredResultsLocatie: string[];
  public dropdownServiciiVisible: boolean = false;
  public dropdownLocationVisible: boolean = false;

  constructor() { }

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
    this.filteredResultsServicii = this.mockValuesServicii.filter(val => val.toLowerCase().startsWith((startsWith as string).toLowerCase()))
  }

  filterResultsLocatie(startsWith: string){
    this.filteredResultsLocatie = this.mockValuesLocatie.filter(val => val.toLowerCase().startsWith((startsWith as string).toLowerCase()))
  }

  clickClearServicii(){
    this.textInputControlServicii.reset();
    this.dropdownServiciiVisible = false;
  }

  clickClearLocatie(){
    this.textInputControlLocation.reset();
    this.dropdownLocationVisible = false;
  }
}
