import { Component, Input } from '@angular/core';
import { Imagine } from 'src/app/model/Imagine';

@Component({
  selector: 'app-image-collection',
  templateUrl: './image-collection.component.html',
  styleUrl: './image-collection.component.css'
})
export class ImageCollectionComponent {
  @Input() imagini: Imagine[];

}
