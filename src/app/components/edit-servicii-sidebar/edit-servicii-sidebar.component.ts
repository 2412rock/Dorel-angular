import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-servicii-sidebar',
  templateUrl: './edit-servicii-sidebar.component.html',
  styleUrl: './edit-servicii-sidebar.component.css'
})
export class EditServiciiSidebarComponent {
  @Output() selectedServiciuEvent: EventEmitter<DBServiciuModel> = new EventEmitter<DBServiciuModel>();
  @Input() servicii: DBServiciuModel[];
  @Input() loading: boolean;
  @Input() resetIndexEvent: EventEmitter<boolean>;

  public selectedServiciuIndex: number;
  constructor(private location: Location){

  }
  ngOnInit(){
    this.resetIndexEvent.subscribe(e => {
      if(e){
        this.selectedServiciuIndex = -1;
      }
    })
  }

  selectServiciu(index: number){
    this.selectedServiciuIndex = index;
    this.selectedServiciuEvent.emit(this.servicii[index]);
  }

  goBack(){
    this.location.back();
  }
}
