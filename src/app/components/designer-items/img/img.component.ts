import { Component, ElementRef, Renderer2, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [],
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent {
  @Output() imgSrcChange = new EventEmitter<string>(); // Emit changes to imgSrc
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  imageSrc: string = "../../../../assets/UploadImgPlaceHolder.jpeg"; // Default placeholder image
  isDragging: boolean = false;
  mouseDownTime: number = 0;

  constructor() {}

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
    // const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    const fileInput = this.fileInput.nativeElement;
    fileInput?.click();
  }

  // onDeleteClick(): void {
  //   const parent = this.elementRef.nativeElement.parentNode;
  //   this.renderer.removeChild(parent, this.elementRef.nativeElement);
  // }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          this.imageSrc = e.target.result as string;
          this.imgSrcChange.emit(this.imageSrc);
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
