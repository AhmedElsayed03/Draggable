import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DraggableItem } from '../../models/draggable-item';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SavingService {

  
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
        this.toastr.success(response.toString(), 'Successfully', {
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
}
