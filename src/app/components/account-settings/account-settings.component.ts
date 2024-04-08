
import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  public menuItemSelected: number = 0;;
  public selectedItemEvent = new EventEmitter<number>();
  public settingsItems = 
  {
    "settings": 
    [{
      "name": "Adauga servicii",
      "img": "https://categories.olxcdn.com/assets/categories/olxro/servicii-afaceri-colaborari-619-1x.png"
     },
     {
      "name": "Edit servicii",
      "img": "https://media.istockphoto.com/id/1303877287/vector/paper-checklist-and-pencil-flat-pictogram.jpg?s=2048x2048&w=is&k=20&c=H67pTLGapJLgTogGNlD0GMhQN2049N93QrBzreO6_Eo="
     },
     {
      "name": "Account",
      "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
     },
     {
      "name": "Graphics",
      "img": "https://icon-library.com/images/graphics-design-icon/graphics-design-icon-20.jpg"
     },
     {
      "name": "Overview",
      "img": "https://cdn-icons-png.freepik.com/512/4624/4624025.png"
     },
     {
      "name": "Calendar",
      "img": "https://cdn-icons-png.flaticon.com/512/10691/10691802.png"
     }
    ]
     
  };

  constructor(private router: Router,
    private sharedDataStorage: SharedDataService){
 }

  ngOnInit(){
  }

  selectMenuItem(index: number){
    if(index === 0){
      this.router.navigate(["./assign-page"]);
    }else if(index === 1){
      this.router.navigate(['./edit-servicii-page']);
    }
  }

  deselectOption(val:boolean){
    if(val){
      this.selectMenuItem(0);
      this.selectedItemEvent.emit(0);
    }
  }


  getDataFromSearch(data: any){

  }
  
}
