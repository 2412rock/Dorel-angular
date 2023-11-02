import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dorel-website';

  data = "no value yet";

  constructor(private dataService: DataService){}

  async ngOnInit(){
   (await this.dataService.getData()).subscribe(result => {
    console.log("GOT RESULT")
    console.log(result)
    this.data = result.name;
   });
  }
}
