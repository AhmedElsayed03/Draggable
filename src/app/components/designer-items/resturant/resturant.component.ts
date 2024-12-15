import { Component } from '@angular/core';
import { DragResizeDirective } from '../../../directives/drag-resize.directive';

@Component({
  selector: 'app-resturant',
  standalone: true,
  imports: [DragResizeDirective],
  templateUrl: './resturant.component.html',
  styleUrl: './resturant.component.css'
})
export class ResturantComponent {

}
