import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imagine } from 'src/app/model/Imagine';
import { FilteredSearchResult } from 'src/app/model/filtered-search-result';
import { SearchResult } from 'src/app/model/search-result';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrl: './search-result-card.component.css'
})
export class SearchResultCardComponent {

  @Input() searchResult: FilteredSearchResult;
  @Output() cardClickEvent: EventEmitter<FilteredSearchResult> = new EventEmitter<FilteredSearchResult>();
  public judete: string[];

  clickCard(){
    this.cardClickEvent.emit(this.searchResult);
  }
}
