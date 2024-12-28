import { Component, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { TextComponent } from '../designer-items/Text/text.component';
import { CustomEditorComponent } from '../designer-items/custom-editor/custom-editor.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CdkDrag],
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
      case 'text':
        component = TextComponent;
        break;
        case 'CustomEditor':
          component = CustomEditorComponent;
          break;

    }

    if (component) {
      const createdComponent = this.container.createComponent(component);
    }
  }

}