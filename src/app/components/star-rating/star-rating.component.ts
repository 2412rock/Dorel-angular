import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input() rating: number;

  filledStarsArray: any[] = [];
  emptyStarsArray: any[] = [];
  halfStar: boolean = false;

  ngOnChanges() {
    const filledCount = Math.floor(this.rating);
    const remainder = this.rating - filledCount;
    this.filledStarsArray = Array(filledCount).fill(0);
    this.emptyStarsArray = Array(5 - Math.ceil(this.rating)).fill(0);
    this.halfStar = remainder >= 0.25 && remainder < 0.75;
  }

}
