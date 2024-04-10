import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationModalComponent } from '../components/notification-modal/notification-modal.component';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { WriteReviewModalComponent } from '../components/write-review-modal/write-review-modal.component';
import { Imagine } from '../model/Imagine';
import { ImageModalComponent } from '../components/image-modal/image-modal.component';

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

  openWriteReviewModal(edit: boolean, description: string | null, rating: number | null): MatDialogRef<WriteReviewModalComponent>  {

    return this.dialog.open(WriteReviewModalComponent, {
      data: {
        edit: edit,
        description: description,
        rating : rating
      },
      panelClass: 'custom-dialog-surface'
    });
  }

  openImagesModal(images: Imagine[], imageIndex: number): MatDialogRef<ImageModalComponent>  {

    return this.dialog.open(ImageModalComponent, {
      data: {
        images: images,
        imageIndex:imageIndex
      },
      panelClass: 'custom-dialog-surface',
      backdropClass: 'darkened-backdrop'
    });
  }
}
