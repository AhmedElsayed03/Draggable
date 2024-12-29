import { Component } from '@angular/core';
import {CdkDragHandle} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CdkDragHandle],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

}
