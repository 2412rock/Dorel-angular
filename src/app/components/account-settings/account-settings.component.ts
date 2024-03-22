
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  public menuItemSelected: number;

  constructor(private router: Router,
    private sharedDataStorage: SharedDataService){
 }

  ngOnInit(){
  }

  selectMenuItem(index: number){
    if(index === 7){
      this.router.navigate(['/basic-search-page']);
      return;
    }
    this.menuItemSelected = index;
  }

  deselectOption(val:boolean){
    if(val){
      this.menuItemSelected = 0;
    }
  }
  
}
