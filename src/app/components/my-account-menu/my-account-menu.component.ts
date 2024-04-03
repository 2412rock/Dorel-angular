import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-my-account-menu',
  templateUrl: './my-account-menu.component.html',
  styleUrl: './my-account-menu.component.css'
})
export class MyAccountMenuComponent {
  public servicii: string[] = ['electrictian', 'menajera', 'curatenie'];
  public name:string;
  public isLoggedIn: boolean;
  public loggedInEmail: boolean;
  public profilePicContent: string;
  public displayPlaceholder: boolean = false;
  public accountDropDown: string[] = ["Log out", "Settings"];
  public showAccountDropdown: boolean = false;
  public placeHolderImg = "https://cdn-icons-png.flaticon.com/512/9131/9131529.png";
  constructor(private router: Router, private localstorageService: LocalstorageService){}

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
        console.log("Display image")
        console.log(profilePicContent)
        this.profilePicContent = profilePicContent;
      }
      else{
        console.log("DISPLAY PLACE")
        this.displayPlaceholder = true;
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
}
