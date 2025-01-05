import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [],
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})  
export class DesignerComponent {
  @Output() componentType = new EventEmitter<string>();
  @Output() showDropdown = new EventEmitter<void>();

  createComponent(type: string) {
    if (type !== 'area') {
      this.showDropdown.emit(); // Trigger the dropdown to show
    }
    this.componentType.emit(type);
  }
}
