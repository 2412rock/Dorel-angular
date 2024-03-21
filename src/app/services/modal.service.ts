import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationModalComponent } from '../components/notification-modal/notification-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openModalNotification(title: string, message: string, isSuccess: boolean): void {
    this.dialog.open(NotificationModalComponent, {
      data: {
        title: title,
        message: message,
        isSuccess: isSuccess
      },
      panelClass: 'custom-dialog-surface'
    });
  }
}
