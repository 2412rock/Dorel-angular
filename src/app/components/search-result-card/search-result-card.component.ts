import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imagine } from 'src/app/model/Imagine';
import { SearchResult } from 'src/app/model/search-result';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrl: './search-result-card.component.css'
})
export class SearchResultCardComponent {

  @Input() searchResult: SearchResult;
  @Output() cardClickEvent: EventEmitter<SearchResult> = new EventEmitter<SearchResult>();

  clickCard(){
    this.cardClickEvent.emit(this.searchResult);
  }

}
