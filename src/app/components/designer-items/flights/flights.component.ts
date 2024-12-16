import { Component } from '@angular/core';
import { DragResizeDirective } from '../../../directives/drag-resize.directive';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [DragResizeDirective, CdkDrag],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

}
