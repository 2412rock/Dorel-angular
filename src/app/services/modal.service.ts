import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationModalComponent } from '../components/notification-modal/notification-modal.component';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { WriteReviewModalComponent } from '../components/write-review-modal/write-review-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openModalNotification(title: string, message: string, isSuccess: boolean): MatDialogRef<NotificationModalComponent> {
    return this.dialog.open(NotificationModalComponent, {
      data: {
        title: title,
        message: message,
        isSuccess: isSuccess
      },
      panelClass: 'custom-dialog-surface'
    });
  }

  openConfirmationModal(title: string, message: string): MatDialogRef<ConfirmationModalComponent>  {
    return this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: title,
        message: message,
      },
      panelClass: 'custom-dialog-surface'
    });
  }

  openWriteReviewModal(): MatDialogRef<WriteReviewModalComponent>  {
    return this.dialog.open(WriteReviewModalComponent, {
      data: {
        
      },
      panelClass: 'custom-dialog-surface'
    });
  }
}
