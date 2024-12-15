import { Component } from '@angular/core';
import { DragResizeDirective } from '../../../directives/drag-resize.directive';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [DragResizeDirective],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

}
