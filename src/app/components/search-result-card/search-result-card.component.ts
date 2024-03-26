import { Component, Input } from '@angular/core';
import { Imagine } from 'src/app/model/Imagine';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrl: './search-result-card.component.css'
})
export class SearchResultCardComponent {

  @Input() userName: string;
  @Input() description: string;
  @Input() rating: number;
  @Input() imagine: Imagine;

}
