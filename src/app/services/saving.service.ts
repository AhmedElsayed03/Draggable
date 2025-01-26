import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { DraggableItem } from '../../models/draggable-item';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SavingService {

  
      @Output() imgSrcChange = new EventEmitter<string>(); 
    
      imageSrc: string = ""; 


  private baseUrl: string = "https://localhost:7045/api/";
  constructor(private http: HttpClient , private toastr: ToastrService) { }

  saveItems(itemsList: DraggableItem[]){
    const items = Array.from(itemsList);
    
    console.log(items)
    if (items.length === 0) {
      console.log('No changes to save.');
      this.toastr.warning('No changes to save.', 'Warning', {
        timeOut: 3000,
      });
      return;
    }
    
    this.http.post(this.baseUrl + 'DraggableItems/save', itemsList).subscribe({
      next: (response) => {
        console.log('Items saved successfully!', response);
        this.toastr.success('Items saved successfully!', 'Successfully', {
          timeOut: 3000,
        });
      },
      error: (err) => {
        console.error('Error saving items:', err);
        this.toastr.error(err, 'Error', {
          timeOut: 3000,
        });

      }
    });

  }


  uploadFile = (files :FileList) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:7045/api/DraggableItems/upload', formData, { responseType: 'text' })
    .subscribe({
      next: (response: string) => {
        console.log('File uploaded successfully:', response);
        this.imageSrc = response; 
        this.imgSrcChange.emit(this.imageSrc);
      },
      error: (err) => {
        console.error('Error uploading file:', err);
      }
    }); 
  }
}
