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

  constructor(private router: Router, private authService: SocialAuthService){}

  checkUserLoggedIn(){
    
  }

  navigateToLoginPage(){
    this.router.navigate(['./login-page'])
  }

  async ngOnInit(){
  //  this.authService.authState.subscribe((user) => {
  //     console.log("USER")
  //     console.log(user)
  //     if(user == null){
  //       this.navigateToLoginPage();
  //     }
  //   })
  // }
  this.router.navigate(["./basic-search-page"]);
  //this.router.navigate(["./account-settings"]);
  }
}
