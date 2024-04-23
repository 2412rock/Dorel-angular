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
  @Input() height: string;
   
  constructor(private modalService: ModalService){
    
  }

  ngOnInit(){
    if(this.width === undefined){
      this.width = "10vw";
    }

    if(this.height === undefined){
      this.height = "16vh";
    }
  }

  clickImage(index: number){
    this.modalService.openImagesModal(this.imagini, index);
  }
}
