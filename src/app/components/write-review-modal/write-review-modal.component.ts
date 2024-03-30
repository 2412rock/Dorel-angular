import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-write-review-modal',
  templateUrl: './write-review-modal.component.html',
  styleUrl: './write-review-modal.component.css'
})
export class WriteReviewModalComponent {

  public validation: boolean;
  public descriptionText: string | null;
  public rating: number | null;
  
  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  publish(): void {
    if(this.descriptionText != null && this.descriptionText.length > 10 && this.rating != null && this.rating != 0){
      let reviewData = new ReviewData();
      reviewData.description = this.descriptionText;
      reviewData.rating = this.rating;
      this.dialogRef.close(reviewData);
    }
    else{
      this.validation = true;
    }
    
  }

  cancel(): void{
    this.dialogRef.close(null);
  }

  saveRaring(rating: number){
    this.rating = rating;
  }
}

export class ReviewData{
  public description: string;
  public rating: number;
}
