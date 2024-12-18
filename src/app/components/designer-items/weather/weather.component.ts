import {Component} from '@angular/core';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { Resizable } from '../../../directives/resizable.directive';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CdkDrag, DragDropModule, Resizable],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent{

}