import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Imagine } from 'src/app/model/Imagine';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrl: './image-modal.component.css'
})
export class ImageModalComponent {
  public imageIndex: number = 0;
  public images: Imagine[];

  constructor(
    private dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
    this.imageIndex = this.data.imageIndex;
    this.images = this.data.images;
  }
  
  clickBack(){
    if(this.imageIndex > 0){
      this.imageIndex -= 1;
    }
    else{
      this.imageIndex = this.images.length - 1;
    }
    
  }
  
  clickForward(){
    if(this.imageIndex < this.images.length - 1){
      this.imageIndex += 1;
    }
    else{
      this.imageIndex = 0;
    }
  }
}
