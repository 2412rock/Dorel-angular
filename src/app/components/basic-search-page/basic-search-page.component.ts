import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchModel } from 'src/app/model/search-model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-basic-search-page',
  templateUrl: './basic-search-page.component.html',
  styleUrls: ['./basic-search-page.component.css']
})
export class BasicSearchPageComponent {
  public servicii: string[] = ['electrictian', 'menajera', 'curatenie'];
  public name:string;
  public isLoggedIn: boolean;
  public loggedInEmail: boolean;
  public profilePicContent: string;
  public displayPlaceholder: boolean = false;
  public accountDropDown: string[] = ["Log out", "Account options"];
  public showAccountDropdown: boolean = false;

  constructor(private router: Router, private localstorageService: LocalstorageService, private sharedDataService: SharedDataService){}

  private stringToBool(value: string){
    return value === "true" ? true : false;
  }

  ngOnInit(){
    let name = localStorage.getItem("name");
    let loggedInEmail = localStorage.getItem("isEmailLogin");
    let profilePicContent = localStorage.getItem("profilePicContent");

    if(name != null && loggedInEmail != null && profilePicContent != null){
      this.isLoggedIn = true;
      this.name = name;
      this.loggedInEmail = this.stringToBool(loggedInEmail);
      if(!this.loggedInEmail){
        this.profilePicContent = profilePicContent;
      }
      else{
        this.displayPlaceholder = this.profilePicContent === "" ? true : false;
      }
    }
  }

  clickMyAccount(){
    this.showAccountDropdown = !this.showAccountDropdown;
  }

  clickLogout(){
    this.localstorageService.deleteUserData();
    location.reload();
  }

  clickLogin(){
    this.router.navigate(["./login-page"])
  }

  clickAccountSettings(){
    this.router.navigate(['./account-settings'])
  }

  navigateToSearch(val: SearchModel){
    this.sharedDataService.setServiciuSelectat(val?.serviciuId, val?.serviciuName);
    this.sharedDataService.setJudetselectat(val?.judetId, val?.judetName);
    this.router.navigate(["./search-results-page"]);
  }
}
