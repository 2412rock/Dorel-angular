import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBAccessLogModel } from 'src/app/model/DBModels/DbAccessLogModel';
import { AccessLogsService } from 'src/app/services/access-logs.service';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-overview-admin',
  templateUrl: './overview-admin.component.html',
  styleUrl: './overview-admin.component.css'
})
export class OverviewAdminComponent {

  public logs: DBAccessLogModel[];
  public emails: string[] = [];
  public dropdownValues = ["Ip addresses", "Emails"]
  public selectedDropdownValue = this.dropdownValues[0];
  public showDropDown: boolean = false;

  constructor(private accessLogsService: AccessLogsService,private modalService: ModalService, private dataService: DataService){}

  ngOnInit(){
    this.getLogs();
  }

  getLogs(){
    firstValueFrom(this.accessLogsService.getLogs()).then(e => {
      if(e.isSuccess){
        this.logs = e.data;
      }
      else{
        this.modalService.openModalNotification("Error", "Cant get logs", false);
      }
    }).catch(e => this.modalService.openModalNotification("Error", "Cant get logs", false))
  }

  getAllUsers(){
    firstValueFrom(this.dataService.getAllUsers()).then(e => {
      if(e.isSuccess){
        this.emails = e.data;
      }
      else{
        this.modalService.openModalNotification("Error", "Cant get users", false);
      }
    }).catch(e => this.modalService.openModalNotification("Error", "Cant get users", false))
  }

  selectItem(index: number){
    this.selectedDropdownValue = this.dropdownValues[index];
    this.showDropDown = false;
    if(index === 0){
      this.getLogs();
    }else{
      this.getAllUsers();
    }
  }

}
