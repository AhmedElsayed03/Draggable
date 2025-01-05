import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, OnInit, ElementRef , Renderer2 } from '@angular/core';

declare const $: any; // Declare jQuery


@Component({
  selector: 'app-img',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css'
})
export class ImgComponent{

  constructor(private elementRef: ElementRef , private renderer: Renderer2) {}

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
  onDeleteClick(): void {
    const parent = this.elementRef.nativeElement.parentNode;
    this.renderer.removeChild(parent, this.elementRef.nativeElement);
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
  
  // ngOnInit(): void {
  //   const resizableElement = this.elementRef.nativeElement.querySelector('#resizable');

  //   $(resizableElement).resizable({
  //     handles: "n, e, s, w", // Define resizing handles'
  //     containment: ".workspace" //Resizing Boundry
  //   }).draggable({
  //     containment: ".workspace" //Dragging Boundry
  //   })
  // }
}