import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: SocialAuthService, private router: Router) {
    
  }
  
  ngOnInit(){
    this.authService.authState.subscribe((user) => {
      console.log("USER")
      console.log(user)
      if(user != null){
        //this.router.navigate(['./home-page']);
      }
    })
  }

  onClickSignUp(){
    this.router.navigate(['./register-page'])
  }



}
