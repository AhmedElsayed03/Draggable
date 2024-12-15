import { Component, EventEmitter, Output } from '@angular/core';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { ResturantComponent } from '../designer-items/resturant/resturant.component';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { ChannelsComponent } from '../designer-items/channels/channels.component';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [FlightsComponent, ResturantComponent, WeatherComponent, ChannelsComponent],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.css'
})
export class DesignerComponent {
  @Output() addComponent = new EventEmitter<string>();

  createComponent(type: string) {
    this.addComponent.emit(type);
  }
}