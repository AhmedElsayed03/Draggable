import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SavingService } from '../../../services/saving.service';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent implements OnInit{

  @Output() public onUploadFinished = new EventEmitter();
  

    @Output() imgSrcChange = new EventEmitter<string>(); // Emit changes to imgSrc
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  
    imageSrc: string = "../../../../assets/UploadImgPlaceHolder.jpeg"; // Default placeholder image
    
  constructor(private http: HttpClient ,private savingService : SavingService) { }
  ngOnInit() {
    this.savingService.imgSrcChange.subscribe((newSrc: string) => {
      console.log('Image source updated:', newSrc);
      this.imageSrc = newSrc; // Update the local imageSrc in MediaComponent
    });

  }

  
  // uploadFile = (files :FileList) => {
  //   if (files.length === 0) {
  //     return;
  //   }
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
    
  //   this.http.post('https://localhost:7045/api/DraggableItems/upload', formData, { responseType: 'text' })
  //   .subscribe({
  //     next: (response: string) => {
  //       console.log('File uploaded successfully:', response);
  //       this.imageSrc = response; // Assign the uploaded file URL
  //       this.imgSrcChange.emit(this.imageSrc); // Emit the updated value
  //     },
  //     error: (err) => {
  //       console.error('Error uploading file:', err);
  //     }
  //   });
   
  // }
}
