import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ValidationService } from 'src/app/services/validation.service';
import { LoginModel } from 'src/app/model/Requests/login-model';
import { Subscription, firstValueFrom } from 'rxjs';
import { LoginGoogleRequest } from 'src/app/model/Requests/login-google-model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public email: string;
  public password: string;
  public loadingSpinner: boolean = false;
  public emailValidation: boolean = false;
  public passwordValidation: boolean = false;
  private routerEventsSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: SocialAuthService,
    private router: Router,
    private loginService: LoginService,
    private validationService: ValidationService,
    private localStorageService: LocalstorageService,
    private sharedDataService: SharedDataService,
    private modalService: ModalService) { }


  ngOnInit() {
    this.routerEventsSubscription =  this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        
        // Check if the navigation event was triggered by the back button press
        if(event.url === "/search-results-page"){
          window.location.reload();
        }
        else{
          this.routerEventsSubscription.unsubscribe();
        }
        
      }
    });
    this.sharedDataService.loginEventEmitter.emit();
    this.authService.authState.subscribe((user) => {
      if (user != null) {
        this.loadingSpinner = true;
        var model = new LoginGoogleRequest();
        model.email = user.email;
        model.name = "";
        if(user.lastName != undefined){
          model.name += user.lastName 
        }
        if(user.firstName != undefined){
          model.name += " " + user.firstName 
        }

        model.idToken = user.idToken;;
        firstValueFrom(this.loginService.loginGoogle(model)).then(res => {
          if (res.isSuccess) {
            this.sharedDataService.setUserEmail(user.email);
            this.localStorageService.setUserData(res.data[1], res.data[0], model.name, "", "false", user.photoUrl, res.data[2], model.email);
            window.location.reload();
            this.loadingSpinner = false;
          }
          else {
            this.modalService.openModalNotification("Failed", `Failed to login ${res.exceptionMessage}`, false);
          }
        }).catch(e => {
          this.loadingSpinner = false;
          this.modalService.openModalNotification("Failed", `Unknown error occured`, false);
        });
      }
    });
  }

  clickForgotPassword(){
    this.router.navigate(['./forgot-password'])
  }

  private loginViaEmail() {
    var model = new LoginModel();
    model.email = this.email;
    model.password = this.password;
    firstValueFrom(this.loginService.login(model)).then(res => {
      if (res.isSuccess) {
        this.sharedDataService.setUserEmail(this.email);
        this.localStorageService.setUserData(res.data[1], res.data[0], "Email name", "", "true", "", res.data[2], model.email);
        window.location.reload();
        this.loadingSpinner = false;
      }
      else {
        this.loadingSpinner = false;
        this.modalService.openModalNotification("Failed", `Failed to login ${res.exceptionMessage}`, false);
      }
    }).catch(e => {
      this.modalService.openModalNotification("Failed", `Unknown error occured`, false);
      this.loadingSpinner = false;
    });
  }

  private validInput() {
    let validationPassed = true;
    if (this.email != null && this.validationService.isValidEmail(this.email)) {
      this.emailValidation = false;
    }
    else {
      validationPassed = false;
      this.emailValidation = true;
    }

    if (this.password != null && this.password.trim() != "") {
      this.passwordValidation = false;
    }
    else {
      validationPassed = false;
      this.passwordValidation = true;
    }
    return validationPassed;
  }

  onClickLogin() {
    if (this.validInput()) {
      this.passwordValidation = false;
      this.emailValidation = false;
      this.loadingSpinner = true;
      this.loginViaEmail();
    }
  }
  onClickSignUp() {
    this.router.navigate(['./register-page'])
  }

  ngOnDestroy() {
    // Unsubscribe from the router events subscription when the component is destroyed
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

}
