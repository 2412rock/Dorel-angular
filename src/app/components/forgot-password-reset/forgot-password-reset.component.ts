import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ResetPasswordReq } from 'src/app/model/Requests/reset-password-req';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrl: './forgot-password-reset.component.css'
})
export class ForgotPasswordResetComponent {
  public code: string;
  public email: string;
  public password: string;
  public repeatPassword: string;
  public repeatPasswordValidation: boolean = false;
  public passwordValidation: boolean = false;

  public loadingSpinner: boolean = false;
  public registerButtonText: string = "Register"

  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private modalService: ModalService){

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.email = params['email'];
        // Use the parameter values as needed
    });
}

  isValidPassword(){
    return this.password != null && this.password.trim() != "";
  }
  
  isValidPasswordAndRepeat(){
    return this.password == this.repeatPassword && this.password != null && this.password != "";
  }

  validateInput(): boolean{
    let validationpassed = true;

    
    if(this.isValidPasswordAndRepeat()){
      this.repeatPasswordValidation = false;
    }
    else{
      validationpassed = false;
      this.repeatPasswordValidation = true;
    }

    if(this.isValidPassword()){
      this.passwordValidation = false;
    }
    else{
      this.passwordValidation = true;
      validationpassed = false;
    }
    return validationpassed;
  }

  clickReset(){
    if(this.validateInput()){
      this.loadingSpinner = true;
      var req = new ResetPasswordReq();
      req.Code = this.code;
      req.Email = this.email;
      req.Password = this.password;
      firstValueFrom(this.loginService.resetPassword(req)).then(e => {
        if(e.isSuccess){
          var ref = this.modalService.openModalNotification("Success", "Password changed", true);
          ref.afterClosed().subscribe(e => {window.location.reload()})
        }
        else{
          this.modalService.openModalNotification("Error", `Something went wrong: ${e.exceptionMessage}`, false);
        }
      }).catch(e => {this.modalService.openModalNotification("Error", `Something went wrong`, false);});
    }
  }
} 

