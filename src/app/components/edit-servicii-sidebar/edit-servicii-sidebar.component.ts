import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-servicii-sidebar',
  templateUrl: './edit-servicii-sidebar.component.html',
  styleUrl: './edit-servicii-sidebar.component.css'
})
export class EditServiciiSidebarComponent {
  @Output() editDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() servicii: string[] = ['serviciu 1', 'serviciu 2', 'serviciu 3']

  public selectedIndex: number = 1;
}
