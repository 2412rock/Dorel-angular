import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css'
})
export class AccountInfoComponent {
  public loadingSpinner: boolean = false;

  constructor(private loginService: LoginService, private localStorageService: LocalstorageService, private modalService: ModalService){}


  deleteAccount(){
    var ref = this.modalService.openConfirmationModal("Warning", "This will delete all of your data. Are you sure you want to proceed?")
    ref.afterClosed().subscribe(e => {
      if(e){
        this.loadingSpinner = true;
        firstValueFrom(this.loginService.deleteAccount()).then(e => {
          if(e.isSuccess){
            this.localStorageService.deleteUserData();
            var ref = this.modalService.openModalNotification("Success", "Account deleted succesfully", true);
            ref.afterClosed().subscribe(e => {
              window.location.reload();
            })
          }else{
            this.modalService.openModalNotification("Failed", `Failed to delete account: ${e.exceptionMessage}`, false);
            this.loadingSpinner = false;
          }
        }).catch(e => {this.modalService.openModalNotification("Failed", `Failed to delete account`, false); this.loadingSpinner = false;;})
      }
    })
    
  }
}
