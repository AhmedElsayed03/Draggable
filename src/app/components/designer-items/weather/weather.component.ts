import {Component} from '@angular/core';
import { DragResizeDirective } from '../../../directives/drag-resize.directive';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [DragResizeDirective],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent{

}