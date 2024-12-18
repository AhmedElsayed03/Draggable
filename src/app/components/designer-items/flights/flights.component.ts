import { Component } from '@angular/core';
import {CdkDrag, DragDropModule} from '@angular/cdk/drag-drop';
import { Resizable } from '../../../directives/resizable.directive';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CdkDrag, DragDropModule, Resizable],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

}
