import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { VerifyUserModel } from 'src/app/model/Requests/verify-user-model';
import {LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-verify-user-component',
  templateUrl: './verify-user-component.component.html',
  styleUrls: ['./verify-user-component.component.css']
})
export class VerifyUserComponentComponent {
  public verificationCode:string;
  public email: string;
  public loadingSpinner: boolean = false;
  public validation: boolean = false;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private router: Router, private modalService: ModalService){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  onClickVerify(){
    if(this.verificationCode != null && this.verificationCode.length == 4){
      this.validation = false;
      this.loadingSpinner = true;
      var model = new VerifyUserModel();
      model.email = this.email;
      model.verificationCode = this.verificationCode;

      firstValueFrom(this.loginService.verifyUser(model)).then(res => {
        if(res.isSuccess){
          this.loadingSpinner = false;
          this.router.navigate(['./verify-success'])
        }
        else{
          this.loadingSpinner = false;
          this.modalService.openModalNotification("Failed", `Verification code did not work: ${res.exceptionMessage}`, false);
        }
      }).catch(err => {
        this.loadingSpinner = false;
        this.modalService.openModalNotification("Failed", `Unknown error occured`, false);
      });
    }
    else{
      this.validation = true;
    }
  }
}
