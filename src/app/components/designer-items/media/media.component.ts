import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SavingService } from '../../../services/saving.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent implements AfterViewInit {
  
  @Output() imgSrcChange = new EventEmitter<string>();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  imageSrc: string = "";
  isVideo: boolean = false;
  constructor(private http: HttpClient) { }
 
  ngAfterViewInit(): void {
    this.fileInput.nativeElement.click(); 
  }

  isMp4File(path : string): boolean {
    const extension = path.split('.').pop()?.toLowerCase();
    return extension === 'mp4';
  }
  

  uploadFile(files: FileList): void {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
  
    this.http.post('https://localhost:7045/api/DraggableItems/upload', formData, { responseType: 'text' })
      .subscribe({
        next: (response: string) => {
          console.log('File uploaded successfully:', response);
          this.imageSrc = response;  
          if (this.isMp4File(this.imageSrc)) {
            this.isVideo = true;
          } else {
            this.isVideo = false;
          }
          this.imgSrcChange.emit(this.imageSrc);
        },
        error: (err) => {
          console.error('Error uploading file:', err);
        }
      });
  }

  
}
