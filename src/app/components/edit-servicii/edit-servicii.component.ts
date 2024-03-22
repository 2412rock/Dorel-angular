import { Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit-servicii',
  templateUrl: './edit-servicii.component.html',
  styleUrl: './edit-servicii.component.css'
})
export class EditServiciiComponent {
  @Output() editDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  public servicii: DBServiciuModel[] = [];

  public selectedServiciu: DBServiciuModel | null;
  public loadingServicii: boolean = true;
  public resetIndex: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private dataService: DataService, private modalService: ModalService){}
  ngOnInit(){
    this.loadServicii();
  }

  loadServicii(){
    firstValueFrom(this.dataService.getServiciiForUser()).then(response => {
      if(response.isSuccess){
        this.servicii = response.data;
        
      }else{
        this.modalService.openModalNotification("Couldnt load servicii", response.exceptionMessage, false);
        this.resetIndex.emit(true);
      }
      this.loadingServicii = false;
    }).catch(e => {
      this.loadingServicii = false;
      this.resetIndex.emit(true);
      this.modalService.openModalNotification("Unknown error", "Couldnt load servicii", false);
    });
  }

  getSelectedServiciu(serviciu: DBServiciuModel){
    this.selectedServiciu = serviciu;
  }

  publishDoneHandler(val: boolean){
    this.selectedServiciu = null;
    this.resetIndex.emit(true);
    this.loadServicii();
  }
}
