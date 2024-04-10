import { Component, Input } from '@angular/core';
import { Imagine } from 'src/app/model/Imagine';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-image-collection',
  templateUrl: './image-collection.component.html',
  styleUrl: './image-collection.component.css'
})
export class ImageCollectionComponent {
  @Input() imagini: Imagine[];
  @Input() width: string;
   
  constructor(private modalService: ModalService){

  }

  clickImage(index: number){
    console.log("Clicked image")
    this.modalService.openImagesModal(this.imagini, index);
  }
}
