import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SendVerificationCodeModel } from 'src/app/model/Requests/SendVerificationCodeModel';
import {LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public name: string;
  public email: string;
  public password: string;
  public repeatPassword: string;
  public nameValidation: boolean = false;
  public emailValidation: boolean = false;
  public repeatPasswordValidation: boolean = false;
  public passwordValidation: boolean = false;

  public loadingSpinner: boolean = false;
  public registerButtonText: string = "Register"

  constructor(private router: Router, 
    private loginService: LoginService, 
    private validationService: ValidationService,
    private modalService: ModalService){

  }

  isValidName(){
    return this.name != null && this.name.trim().length > 0;
  }

  isValidPassword(){
    return this.password != null && this.password.trim() != "";
  }
  
  isValidPasswordAndRepeat(){
    return this.password == this.repeatPassword && this.password != null && this.password != "";
  }



  validateInput(): boolean{
    let validationpassed = true;

    if(this.isValidName()){
      this.nameValidation = false;;
      
    }
    else{
      validationpassed = false;
      this.nameValidation = true;
    }
    if(this.isValidPasswordAndRepeat()){
      this.repeatPasswordValidation = false;
    }
    else{
      validationpassed = false;
      this.repeatPasswordValidation = true;
    }

    if(this.validationService.isValidEmail(this.email)){
      this.emailValidation = false;
    }
    else{
      validationpassed = false;
      this.emailValidation = true;
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

  async onClickRegister(){
    
    
    if(this.validateInput()){
      this.loadingSpinner = true;
      this.registerButtonText = "Loading.."
      var sendVerificationCodeModel = new SendVerificationCodeModel();
      sendVerificationCodeModel.email = this.email;
      sendVerificationCodeModel.name = this.name;
      sendVerificationCodeModel.password = this.password;

      await firstValueFrom(this.loginService.sendVerificationCode(sendVerificationCodeModel)).then(response => {
        if(response.isSuccess){
          this.loadingSpinner = false;
          const params = { email: this.email };
          this.router.navigate(['./verify-page'], { queryParams: params })
        }
        else{
          this.loadingSpinner = false;
          this.registerButtonText = "Register"
          this.modalService.openModalNotification("Failed", `Cannot register account: ${response.exceptionMessage}`, false);
        }
      }).catch(e => {
        this.loadingSpinner = false;
        this.registerButtonText = "Register"
        this.modalService.openModalNotification("Failed", `Unknown error occured`, false);
      });
    }
  }
}
