import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-servicii',
  templateUrl: './edit-servicii.component.html',
  styleUrl: './edit-servicii.component.css'
})
export class EditServiciiComponent {
  @Output() editDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() servicii: string[] = ['serviciu 1', 'serviciu 2', 'serviciu 3']

  public selectedIndex: number = 1;
}
