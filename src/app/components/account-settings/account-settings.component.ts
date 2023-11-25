import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  public menuItemSelected: number;
  public isToggleEnabled: boolean;
  public searchTermServiciu: string;
  public searchResultServiciu: string[] = ["alo" ,"alo2"];
  public selectedServicii: string[] = [];
  public selectedJudete: string[] = [];
  public serviciiSearchResultEventEmitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectMenuItem(index: number){
    this.menuItemSelected = index;
  }

  removeSelectedJudet(val: string){
    this.selectedJudete = this.selectedJudete.filter(e => e !== val);
  }

  removeSelectedServiciu(val: string){
    this.selectedServicii = this.selectedServicii.filter(e => e !== val);
  }

  getSelectedValueServicii(element: string){
    this.selectedServicii.push(element);
  }

  getSelectedValueJudete(element: string){
    this.selectedJudete.push(element);
  }

  getServiciuTypeValue(val: string){
    console.log("GOT TYPED VALUE FROM SEARCH " + val)
    this.serviciiSearchResultEventEmitter.emit(['first val', 'second val'])
  }
}
