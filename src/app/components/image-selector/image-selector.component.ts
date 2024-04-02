import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Imagine } from 'src/app/model/Imagine';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent {
  @Output() outPutImages: EventEmitter<Imagine[]> = new EventEmitter<Imagine[]>();
  @Input() selectedImages: Imagine[];
  @ViewChild('fileInput') inputRef: ElementRef<HTMLInputElement>;
  constructor(private modalService: ModalService) { }

  private getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedImages, event.previousIndex, event.currentIndex);
    this.outPutImages.emit(this.selectedImages);
  }

  onSubmit(): void {

  }

  addFiles(files: FileList | null): void {
    console.log(files);
    //this.filesChanged.emit(files);
  }

  handleFileDrop(event: DragEvent | null) {
    if (event?.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      this.inputRef.nativeElement.files = files;
      if(files.length > 10){
        this.modalService.openModalNotification("Error", "Please select only 10 images", false);
        return;
      }
      this.readFilesData(files);
    }
  }

  readFilesData(files: any){
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

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      if (files.length > 10) {
        this.modalService.openModalNotification("Error", "Please select only 10 images", false);
        return;
      }
      this.readFilesData(files);
    }
  }

   removeImage(item: any) {
    const index = this.selectedImages.indexOf(item);
    if (index !== -1) {
      this.selectedImages.splice(index, 1);
    }
    this.outPutImages.emit(this.selectedImages);
  }

}
