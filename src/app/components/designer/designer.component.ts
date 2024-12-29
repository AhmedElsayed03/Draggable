import { Component, EventEmitter, Output } from '@angular/core';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { TextComponent } from '../designer-items/Text/text.component';


@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [FlightsComponent,  WeatherComponent, TextComponent],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.css'
})  
export class DesignerComponent {
  @Output() componentType = new EventEmitter<string>();

  createComponent(type: string) {
    this.componentType.emit(type);
  }
}