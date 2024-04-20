import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SendVerificationCodeModel } from 'src/app/model/Requests/SendVerificationCodeModel';
import { SendCodePasswordResetReq } from 'src/app/model/Requests/send-code-password-reset-req';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  public emailValidation: boolean = false;
  public email: string;
  public loadingSpinner: boolean = false;

  constructor(private loginService: LoginService,
    private validationService: ValidationService,
    private modalService: ModalService,
    private router: Router){}

  clickReset(){
    if(this.validationService.isValidEmail(this.email)){
      this.loadingSpinner = true;
      this.emailValidation = false;
      var req = new SendCodePasswordResetReq();
      req.email = this.email;
      firstValueFrom(this.loginService.sendVerificationCodeResetPassword(req)).then(resp => {
        if(resp.isSuccess){
          this.router.navigate(['./forgot-password-reset'], { queryParams: { email: this.email  } })
        }
        else{
          this.modalService.openModalNotification("Error", `Something went wrong: ${resp.exceptionMessage}`, false)
        }
      }).catch(e => this.modalService.openModalNotification("Error", "Something went wrong", false))
    }
    else{
      this.emailValidation = true;
    }
  }
}
