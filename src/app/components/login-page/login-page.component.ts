import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import {LoginService } from 'src/app/services/login.service';
import { ValidationService } from 'src/app/services/validation.service';
import { LoginModel } from 'src/app/model/Requests/login-model';
import { firstValueFrom } from 'rxjs';
import { LoginGoogleRequest } from 'src/app/model/Requests/login-google-model';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public email: string;
  public password: string;
  public loadingSpinner: boolean = false;

  constructor(private fb: FormBuilder,
     private authService: SocialAuthService,
     private router: Router,
     private loginService: LoginService,
     private validationService: ValidationService,
     private localStorageService: LocalstorageService) { }
  

  ngOnInit(){
    this.authService.authState.subscribe((user) => {
      if(user != null){
        this.loadingSpinner = true;
        var model = new LoginGoogleRequest();
        model.email = user.email;
        model.name = user.lastName + " " + user.firstName;
        model.idToken = user.idToken;;
        firstValueFrom(this.loginService.loginGoogle(model)).then(res => {
            if(res.isSuccess){
              this.localStorageService.setUserData(res.data[0], res.data[1], model.name, "", "false", user.photoUrl);
              this.router.navigate(['./basic-search-page']);
            }
        }).catch(e => {
          console.log(e);
          this.loadingSpinner = false;
        });
      }
    });
    this.authService.signOut();
  }

  onClickLogin(){
    if(this.email != null && this.validationService.isValidEmail(this.email) && this.password != null){
      this.loadingSpinner = true;
      var model = new LoginModel();
      model.email = this.email;
      model.password = this.password;
      firstValueFrom(this.loginService.login(model)).then(res => {
        if(res.isSuccess){
          this.localStorageService.setUserData(res.data[0], res.data[1], "Email name", "", "true", "");
          this.router.navigate(['./basic-search-page']);
        }
      }).catch(e => {
        console.log(e)
        this.loadingSpinner = false;
      });
    }
  }

  onClickSignUp(){
    this.router.navigate(['./register-page'])
  }

}
