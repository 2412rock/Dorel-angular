import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { Maybe } from 'src/app/model/maybe';

@Component({
  selector: 'app-generic-search-bar',
  templateUrl: './generic-search-bar.component.html',
  styleUrls: ['./generic-search-bar.component.css']
})
export class GenericSearchBarComponent {
  @Output() selectedValueEmitter = new EventEmitter<any>();
  @Output() typedValue = new EventEmitter<string>();
  @Input() searchResultEventEmitter: EventEmitter<any[]>;
  @Input() placeHolderText: string;
  @ViewChild('parentElement', { static: true }) parentElement: ElementRef;

  public textInput: FormControl = new FormControl('');
  public dropdownVisible: boolean = false;
  public filteredResults: any[] = [];
  public typedValueString: string;

  ngOnInit(): void {
    this.searchResultEventEmitter.subscribe(e => {
      console.log("GOT SEARCH VALUE")
      console.log(e)
      if(e.length == 0){
        this.filteredResults = [this.typedValueString];
      }else{
        e.forEach(e => {
          this.filteredResults = [];
          this.filteredResults.push(e);
        });
      }
      
    });
    this.textInput.valueChanges.subscribe(value => {
      if(value != null){
        this.typedValue.emit(value);
        this.typedValueString = value;
        this.dropdownVisible = true;
      }
      var str = value as string;
      if(str.length == 0 || str.trim().length == 0){
        this.dropdownVisible = false;
      }
    });
  }

  clearSerchbar(){
    this.textInput.reset();
    this.dropdownVisible = false;
  }

  selectOption(element: string){
    this.selectedValueEmitter.emit(element);
    this.clearSerchbar();
  }

  getParentWidth(): number {
    return this.parentElement.nativeElement.offsetWidth;
  }
}
