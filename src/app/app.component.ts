import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dorel-website';

  data = "no value yet";
  userIsLoggedIn: boolean = false;

  constructor(private router: Router){}

  checkUserLoggedIn(){
    
  }

  navigateToLoginPage(){
    this.router.navigate(['./login-page'])
  }

  async ngOnInit(){
    
  this.router.navigate(["./basic-search-page"]);
  //this.router.navigate(["./account-settings"]);
  //this.router.navigate(["search-results-page"]);
  //this.router.navigate(["./serviciu-detail-page"]);
 // this.router.navigate(["./serviciu-detail-page"]);
  }
}

