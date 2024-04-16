import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string;
  @Output() click = new EventEmitter<void>();

  clickBtn(){
    this.click.emit();
  }
}
