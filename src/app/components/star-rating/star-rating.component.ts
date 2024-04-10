import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input() rating: number;
  @Input() static: boolean;
  @Output() ratingEvent: EventEmitter<number> = new EventEmitter<number>();

  filledStarsArray: any[] = [];
  emptyStarsArray: any[] = [];
  halfStar: boolean = false;
  stars: Star[] = [];
  public starsSaved: boolean = false;;

  ngOnChanges() {
    const filledCount = Math.floor(this.rating);
    const remainder = this.rating - filledCount;
    this.filledStarsArray = Array(filledCount).fill(0);
    this.emptyStarsArray = Array(5 - Math.ceil(this.rating)).fill(0);
    this.halfStar = remainder >= 0.25 && remainder < 0.75;
  }


  constructor() { }

  ngOnInit(): void {
    this.initializeStars();
  }

  initializeStars(): void {
    for (let i = 0; i < 5; i++) {
      if(i< this.rating){
        this.stars.push({ highlighted: true, active: false });
      }
      else{
        this.stars.push({ highlighted: false, active: false });
      }
      
    }
  }

  highlightStars(index: number): void {
    if(!this.starsSaved){
      this.stars.forEach((star, i) => {
        star.highlighted = i <= index;
      });
    }
    
  }

  resetStarsMouseLeave(): void {
    if(!this.stars[0].highlighted && !this.starsSaved){
      this.stars.forEach(star => star.highlighted = false);
    } 
  }

  resetStars(): void {
    this.stars.forEach(star => star.highlighted = false);
  }

  saveRating(): void {
    this.starsSaved = !this.starsSaved;
    const rating = this.stars.filter(star => star.highlighted).length;

  // Toggle the active state of stars
    this.stars.forEach((star, index) => {
      star.active = index < rating;
    });
    this.ratingEvent.emit(rating);
    }

}

export class Star{
  public highlighted: boolean;
  public active: boolean;
}
