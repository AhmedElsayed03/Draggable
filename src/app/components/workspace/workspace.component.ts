import { Component, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { ChannelsComponent } from '../designer-items/channels/channels.component';
import { ResturantComponent } from '../designer-items/resturant/resturant.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent {
  @ViewChild('workspaceContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  addComponent(type: string) {
    let component: Type<any> | null = null;

    switch (type) {
      case 'weather':
        component = WeatherComponent;
        break;
      case 'flights':
        component = FlightsComponent;
        break;
      case 'channels':
        component = ChannelsComponent;
        break;
      case 'resturant':
        component = ResturantComponent;
        break;
    }

    if (component) {
      const createdComponent = this.container.createComponent(component);
    }
  }

}