import { Directive, ElementRef, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {

  @Output() clickOutsideEvent;
  private _enabled: boolean;
  @Input() set appClickOutside(value: any) {
    this._enabled = value === '' ? true : !!value;
  }


  constructor(private elementRef: ElementRef) { 
    this.clickOutsideEvent = new EventEmitter<any>();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement || clickedElement.id === 'sidebar-btn') {
        // Do nothing if the clicked element has the specified ID
        return;
    }
    if (!this.elementRef.nativeElement.contains(clickedElement)) {
        this.clickOutsideEvent.emit();
    }
  }

}
