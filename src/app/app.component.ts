import { Component } from '@angular/core';
import { DataService } from './services/data.service';
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

  constructor(private dataService: DataService, private router: Router, private authService: SocialAuthService){}

  checkUserLoggedIn(){
    
  }

  navigateToLoginPage(){
    this.router.navigate(['./login-page'])
  }

  async ngOnInit(){
   (await this.dataService.getData()).subscribe(result => {
    console.log("GOT RESULT")
    console.log(result)
    this.data = result.name;
   });


   this.authService.authState.subscribe((user) => {
      console.log("USER")
      console.log(user)
      if(user == null){
        this.navigateToLoginPage();
      }
    })
  }
}
