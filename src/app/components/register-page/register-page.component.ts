import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SendVerificationCodeModel } from 'src/app/model/Requests/SendVerificationCodeModel';
import { DataService } from 'src/app/services/data.service';
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

  public loadingSpinner: boolean = false;
  public registerButtonText: string = "Register"

  constructor(private router: Router, private dataService: DataService, private validationService: ValidationService){

  }

  isValidName(){
    return this.name != null && this.name.trim().length > 0;
  }

  isValidPassword(){
    return this.password == this.repeatPassword;
  }

  async onClickRegister(){
    if(this.isValidName() && this.validationService.isValidEmail(this.email) && this.isValidPassword()){
      this.loadingSpinner = true;
      this.registerButtonText = "Loading.."
      console.log("Evrything checks out")
      var sendVerificationCodeModel = new SendVerificationCodeModel();
      sendVerificationCodeModel.email = this.email;
      sendVerificationCodeModel.name = this.name;
      sendVerificationCodeModel.password = this.password;

      await firstValueFrom(this.dataService.sendVerificationCode(sendVerificationCodeModel)).then(response => {
        if(response.isSuccess){
          const params = { email: this.email };
          this.router.navigate(['./verify-page'], { queryParams: params })
        }
      })
      
    }
  }
}
