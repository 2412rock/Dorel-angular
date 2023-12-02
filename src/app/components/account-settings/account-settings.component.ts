
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { DBJudetModel } from 'src/app/model/DBModels/DBJudetModel';
import { DBServiciuModel } from 'src/app/model/DBModels/DBServiciuModel';
import { StartsWithRequest } from 'src/app/model/Requests/starts-with-model';
import { AppState } from 'src/app/ngrx/reducer';
import {selectSelectedServicii } from 'src/app/ngrx/selectors';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  public menuItemSelected: number;


  constructor(private router: Router,
    private store: Store<{ app: AppState }>,
    private sharedDataStorage: SharedDataService){
  //   var selector = this.store.pipe(select(selectSelectedServicii));
  //   selector.subscribe((value) => {
  //     console.log('GOT VALUE FROM NGRX:', value);
      
  //   });
 }

  ngOnInit(){
    this.sharedDataStorage.subjectData$.subscribe(e => {
      if(e != null){
        console.log("RECEIVED DATA")
      console.log(e)
     // this.router.navigate(['./account-settings/add-description-images'])
      this.router.navigateByUrl('/account-settings', { skipLocationChange: true }).then(() => {
        this.router.navigate(['./account-settings/add-description-images']);
      });
      }
      
    })
  }

  selectMenuItem(index: number){
    this.menuItemSelected = index;
    if(index == 0){
      this.router.navigate(['./account-settings/assign-servicii']);
    }
  }


  
}
