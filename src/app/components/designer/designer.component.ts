import { Component, EventEmitter, Output } from '@angular/core';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { WeatherComponent } from '../designer-items/weather/weather.component';


@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [FlightsComponent,  WeatherComponent],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.css'
})
export class DesignerComponent {
  @Output() addComponent = new EventEmitter<string>();

  createComponent(type: string) {
    this.addComponent.emit(type);
  }
}