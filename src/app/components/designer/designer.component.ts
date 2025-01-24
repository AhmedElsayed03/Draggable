import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { error } from 'jquery';
import { MediaComponent } from '../designer-items/media/media.component';
import { SavingService } from '../../services/saving.service';

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
constructor(private http :HttpClient , private savingService :SavingService  ) {  }
  ngOnInit(): void {
  this.getUploadedFiles();
  }
  ngAfterViewInit() {


    if (!this.savingService) {
      console.error('savingService is not initialized');
    }
  }
  createComponent(type: string) {
    if (type !== 'area') {
      this.showDropdown.emit();
    }
    this.componentType.emit(type);
  }


  uploadFile(files: FileList): void {
    if (files.length > 0 && this.savingService) {
      this.savingService.uploadFile(files); 
      this.componentType.emit('media');
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
