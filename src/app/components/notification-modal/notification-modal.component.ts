import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css'
})
export class NotificationModalComponent {

  constructor(
    private dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
