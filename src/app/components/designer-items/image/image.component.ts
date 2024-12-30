import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Resizable } from '../../../directives/resizable.directive';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CdkDrag, Resizable],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  imageSrc: string = "../../../../assets/UploadImgPlaceHolder.jpeg"; // Default placeholder image
  isDragging: boolean = false;
  mouseDownTime: number = 0;

  onMouseDown(): void {
    this.mouseDownTime = Date.now(); 
  }

  onMouseUp(): void {
    const duration = Date.now() - this.mouseDownTime;
    if (duration < 300 && !this.isDragging) {
      this.onImageClick();
    }
  }

  onImageClick(): void {
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imageSrc = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  onDragStarted(): void {
    this.isDragging = true;
  }

  onDragEnded(): void {
    this.isDragging = false;
  }
}
