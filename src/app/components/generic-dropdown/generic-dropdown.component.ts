import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-dropdown',
  templateUrl: './generic-dropdown.component.html',
  styleUrl: './generic-dropdown.component.css'
})
export class GenericDropdownComponent {
  public showDropDown: boolean = false;
  @Input() selectedDropdownValue: string;
  @Input() dropdownValues: string[];
  @Output() selectedValueEvent = new EventEmitter<number>();


  ngOnInit(){

  }

  selectItem(index: number){
    console.log("Select")
    this.selectedDropdownValue = this.dropdownValues[index];
    this.selectedValueEvent.emit(index);
    this.showDropDown = false;
  }
}
