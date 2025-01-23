import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'jquery';
import { MediaComponent } from '../designer-items/media/media.component';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [CommonModule ,MediaComponent ],
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})  
export class DesignerComponent implements OnInit ,AfterViewInit {
  @Output() componentType = new EventEmitter<string>();
  @Output() showDropdown = new EventEmitter<void>();

  uploadedFiles: string[] = [];
  @ViewChild(MediaComponent) mediaComponent!: MediaComponent; // استخدام @ViewChild للوصول إلى المكون الفرعي

constructor(private http :HttpClient, private cdRef: ChangeDetectorRef  ) {  }
  ngOnInit(): void {
  this.getUploadedFiles();
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges(); // Trigger change detection manually


    if (!this.mediaComponent) {
      console.error('MediaComponent is not initialized');
    }
  }
  createComponent(type: string) {
    if (type !== 'area') {
      this.showDropdown.emit();
    }
    this.componentType.emit(type);
  }


  uploadFile(files: FileList): void {
    if (files.length > 0 && this.mediaComponent) {
      this.mediaComponent.uploadFile(files); // Call uploadFile in MediaComponent
    }
  }


  getUploadedFiles(): void{
    this.http.get<string[]>('https://localhost:7045/api/DraggableItems/Resources/Images').subscribe({
      next: (data) => {
        this.uploadedFiles = data; 
      },
      error:(error) =>{
        console.log(error)
      }
    });
  } 

selectFile(file : string): void{
  this.componentType.emit('media');


}




}
