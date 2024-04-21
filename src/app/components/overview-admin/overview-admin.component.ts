import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DBAccessLogModel } from 'src/app/model/DBModels/DbAccessLogModel';
import { AccessLogsService } from 'src/app/services/access-logs.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-overview-admin',
  templateUrl: './overview-admin.component.html',
  styleUrl: './overview-admin.component.css'
})
export class OverviewAdminComponent {

  public logs: DBAccessLogModel[];

  constructor(private accessLogsService: AccessLogsService,private modalService: ModalService){}

  ngOnInit(){
    firstValueFrom(this.accessLogsService.getLogs()).then(e => {
      if(e.isSuccess){
        this.logs = e.data;
      }
      else{
        this.modalService.openModalNotification("Error", "Cant get logs", false);
      }
    }).catch(e => this.modalService.openModalNotification("Error", "Cant get logs", false))
  }
}
