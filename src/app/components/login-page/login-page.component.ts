import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ValidationService } from 'src/app/services/validation.service';
import { LoginModel } from 'src/app/model/Requests/login-model';
import { firstValueFrom } from 'rxjs';
import { LoginGoogleRequest } from 'src/app/model/Requests/login-google-model';

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
     private dataService: DataService,
     private validationService: ValidationService) { }
  

  ngOnInit(){
    this.authService.authState.subscribe((user) => {
      if(user != null){
        this.loadingSpinner = true;
        var model = new LoginGoogleRequest();
        model.email = user.email;
        model.name = user.lastName + " " + user.firstName;
        firstValueFrom(this.dataService.loginGoogle(model)).then(res => {
            if(res.message === "ok"){
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
      firstValueFrom(this.dataService.login(model)).then(res => {
        if(res.message === "Login success"){
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
