import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-write-review-modal',
  templateUrl: './write-review-modal.component.html',
  styleUrl: './write-review-modal.component.css'
})
export class WriteReviewModalComponent {

  public validationRating: boolean;
  public validationDescription: boolean;
  public descriptionText: string = "";
  public rating: number = 0;
  
  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
    console.log(this.data)
    if(this.data.edit){
      this.descriptionText = this.data.description;
      this.rating = this.data.rating;
    }
    console.log(this.rating)
  }

  publish(): void {
    if(this.descriptionText.length > 10 && this.rating != null && this.rating != 0){
      let reviewData = new ReviewData();
      reviewData.description = this.descriptionText;
      reviewData.rating = this.rating;
      this.dialogRef.close(reviewData);
    }
    if(this.descriptionText.length < 10){
      this.validationDescription = true;
    }
    else{
      this.validationDescription = false;
    }
    if(this.rating == null || this.rating == 0){
      this.validationRating = true;
    }
    else{
      this.validationRating = false;
    }
    
  }

  cancel(): void{
    this.dialogRef.close(null);
  }

  deleteReview(): void{
    this.dialogRef.close(true);
  }

  saveRaring(rating: number){
    this.rating = rating;
  }
}

export class ReviewData{
  public description: string;
  public rating: number;
}
