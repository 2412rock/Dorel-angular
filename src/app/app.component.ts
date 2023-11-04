import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dorel-website';

  data = "no value yet";
  userIsLoggedIn: boolean = false;

  constructor(private dataService: DataService, private router: Router){}

  checkUserLoggedIn(){
    // TO DO
    this.userIsLoggedIn = false;
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
   this.checkUserLoggedIn();
   if(!this.userIsLoggedIn){
    this.navigateToLoginPage();
   }
  }
}
