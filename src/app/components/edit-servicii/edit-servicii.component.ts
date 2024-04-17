import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { SearchModel } from 'src/app/model/search-model';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

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
  public showMessageNotification: boolean = false;

  constructor(private dataService: DataService,
    private modalService: ModalService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private chatService: ChatService){}

  ngOnInit(){
    this.loadServicii();
    this.chatService.getMessageObservable().subscribe(e => {
      this.showMessageNotification = true;
    })
  }

  loadServicii(){
    firstValueFrom(this.dataService.getServiciiForUser()).then(response => {
      if(response.isSuccess){
        this.servicii = response.data;
        
      }else{
        this.modalService.openModalNotification("Couldnt load servicii", response.exceptionMessage, false);
        this.editDone.emit(true);
      }
      this.loadingServicii = false;
    }).catch(e => {
      this.loadingServicii = false;
      this.editDone.emit(true);
      this.modalService.openModalNotification("Unknown error", "Couldnt load servicii", false);
    });
  }

  goToMessages(){
    this.showMessageNotification = false;
    this.router.navigate(['./chat']);
  }

  getSelectedServiciu(serviciu: DBServiciuModel){
    this.selectedServiciu = serviciu;
  }

  publishDoneHandler(val: boolean){
    this.selectedServiciu = null;
    this.resetIndex.emit(true);
    this.loadServicii();
  }

  navigateToSearch(val: SearchModel){
    this.sharedDataService.setServiciuSelectat(val?.serviciuId, val?.serviciuName);
    this.sharedDataService.setJudetselectat(val?.judetId, val?.judetName);
    this.router.navigate(["./search-results-page"]);
  }

  clickLogo(){
    this.router.navigate(["./search-results-page"]);
  }
}
