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
  public descriptionText: string;
  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  accept(): void {
    this.dialogRef.close(true);
  }

  decline(): void{
    this.dialogRef.close(false);
  }
}
