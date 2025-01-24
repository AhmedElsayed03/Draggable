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
export class MediaComponent implements OnInit , AfterViewInit {

  @Output() public onUploadFinished = new EventEmitter();
  

    @Output() imgSrcChange = new EventEmitter<string>(); // Emit changes to imgSrc
    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;
  
    imageSrc: string = "../../../../assets/UploadImgPlaceHolder.jpeg"; // Default placeholder image
    isVideo: boolean = false;
  constructor(private http: HttpClient ,private savingService : SavingService) { }
  ngAfterViewInit(): void {
    this.savingService.imgSrcChange.subscribe((newSrc: string) => {
      console.log('Image source updated:', newSrc);
      this.imageSrc = newSrc; 


      if (this.isMp4File(this.imageSrc)) {
        this.isVideo = true;
      } else {
        this.isVideo = false;
      }


      this.imgSrcChange.emit(this.imageSrc);
    });  
  }
  ngOnInit() {
 
  }

  isMp4File(path : string): boolean {
    const extension = path.split('.').pop()?.toLowerCase();
    return extension === 'mp4';
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
