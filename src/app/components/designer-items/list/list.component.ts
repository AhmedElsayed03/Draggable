import { Component } from '@angular/core';
import { ListItem } from '../../../../models/list-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  items: ListItem[] = []

  isModalOpen = false;
  newItem = { imageSrc: "", description: "", routerLink: "link" };

    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    }
  
    closeModal() {
      this.isModalOpen = false;
      this.resetForm();
    }
  
    resetForm() {
      this.newItem = { description: '', imageSrc: '', routerLink: '' };
    }
  
    addItem() {
      if (this.newItem.description && this.newItem.routerLink) {
        this.items.push({ ...this.newItem });
        console.log("Item added:", this.newItem);
        this.closeModal();
      }
    }
  
    onImageUpload(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.newItem.imageSrc = URL.createObjectURL(file);
        console.log(this.newItem.imageSrc);
      }
    }
  
}
