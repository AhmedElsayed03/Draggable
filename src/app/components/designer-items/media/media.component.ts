import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent implements OnInit{
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();
  

    @Output() imgSrcChange = new EventEmitter<string>(); // Emit changes to imgSrc
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  
    imageSrc: string = "../../../../assets/UploadImgPlaceHolder.jpeg"; // Default placeholder image
    isDragging: boolean = false;
    mouseDownTime: number = 0;
  

    
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }

  uploadFile = (files :FileList) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:7045/api/DraggableItems/upload', formData, { observe: 'events', responseType: 'text' as 'json' }) // Observe events with response type as text
    .subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / (event.total ?? 1));
        } else if (event.type === HttpEventType.Response) {
          const response = event.body as string; // Cast response as string
          this.imageSrc = response;
          this.imgSrcChange.emit(this.imageSrc);
          console.log('File URL:', this.imageSrc);
          this.message = 'Upload success.';
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Upload failed:', err.message);
        this.message = 'Upload failed. Please try again.';
      }
    });
  

    
  }
}
