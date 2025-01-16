import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DraggableItem } from '../../models/draggable-item';

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  
  private baseUrl: string = "https://localhost:7045/api/";
  constructor(private http: HttpClient) { }

  saveItems(itemsList: DraggableItem[]){
    const items = Array.from(itemsList);
    
    console.log(items)
    if (items.length === 0) {
      console.log('No changes to save.');
      return;
    }
    
    this.http.post(this.baseUrl + 'DraggableItems/save', itemsList).subscribe({
      next: (response) => {
        console.log('Items saved successfully!', response);
        // this.itemsList.Clear(); // Clear the modified items set after saving
      },
      error: (err) => console.error('Error saving items:', err)
    });
  }
}
