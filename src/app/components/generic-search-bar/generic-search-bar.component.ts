import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-generic-search-bar',
  templateUrl: './generic-search-bar.component.html',
  styleUrls: ['./generic-search-bar.component.css']
})
export class GenericSearchBarComponent {
  @Output() selectedValueEmitter = new EventEmitter<string>();
  @Output() typedValue = new EventEmitter<string>();
  @Input() searchResultEventEmitter: EventEmitter<string[]>;

  public textInput: FormControl = new FormControl('');
  public dropdownVisible: boolean = false;
  public filteredResults: string[] = [];

  ngOnInit(): void {
    this.searchResultEventEmitter.subscribe(e => {
      console.log("GOT SEARCH VALUE")
      this.filteredResults = e;
    });
    this.textInput.valueChanges.subscribe(value => {
      if(value != null){
        this.typedValue.emit(value);
        this.dropdownVisible = true;
        this.filterResultsServicii(value);
      }
      var str = value as string;
      if(str.length == 0 || str.trim().length == 0){
        this.dropdownVisible = false;
      }
    });
  }

  filterResultsServicii(startsWith: string){

  }

  clearSerchbar(){
    this.textInput.reset();
    this.dropdownVisible = false;
  }

  selectOption(element: string){
    this.selectedValueEmitter.emit(element);
    this.clearSerchbar();
  }
}
