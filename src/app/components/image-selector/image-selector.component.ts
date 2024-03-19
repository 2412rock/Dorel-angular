import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imagine } from 'src/app/model/Imagine';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent {
  @Output() outPutImages:EventEmitter<Imagine[]> = new EventEmitter<Imagine[]>();
  @Input() selectedImages: Imagine[];

  private getFileExtension(fileName: string): string{
    return fileName.split('.').pop() || '';
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
              var img = new Imagine();
              img.fileContentBase64 = reader.result as string;
              img.fileExtension = this.getFileExtension(file.name);
              img.fileType = file.type;
              this.selectedImages.push(img);
            };
            reader.readAsDataURL(file);
        }
        this.outPutImages.emit(this.selectedImages);
    }
}

removeImage(item: any) {
    const index = this.selectedImages.indexOf(item);
    if (index !== -1) {
        this.selectedImages.splice(index, 1);
    }
    this.outPutImages.emit(this.selectedImages);
}


drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.selectedImages, event.previousIndex, event.currentIndex);
  this.outPutImages.emit(this.selectedImages);
}

onSubmit(): void {
    
}

}
