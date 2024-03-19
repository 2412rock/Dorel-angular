import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';

@Component({
  selector: 'app-edit-servicii-sidebar',
  templateUrl: './edit-servicii-sidebar.component.html',
  styleUrl: './edit-servicii-sidebar.component.css'
})
export class EditServiciiSidebarComponent {
  @Output() selectedServiciuEvent: EventEmitter<DBServiciuModel> = new EventEmitter<DBServiciuModel>();
  @Input() servicii: DBServiciuModel[];

  public selectedServiciuIndex: number;

  selectServiciu(index: number){
    this.selectedServiciuIndex = index;
    this.selectedServiciuEvent.emit(this.servicii[index]);
  }
}
