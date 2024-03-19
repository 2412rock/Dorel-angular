import { Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-servicii',
  templateUrl: './edit-servicii.component.html',
  styleUrl: './edit-servicii.component.css'
})
export class EditServiciiComponent {
  @Output() editDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  public servicii: DBServiciuModel[] = [];

  public selectedServiciu: DBServiciuModel;

  constructor(private dataService: DataService){}
  ngOnInit(){
    firstValueFrom(this.dataService.getServiciiForUser()).then(response => {
      if(response.isSuccess){
        this.servicii = response.data;
      }
    })
  }

  getSelectedServiciu(serviciu: DBServiciuModel){
    this.selectedServiciu = serviciu;
  }
}
