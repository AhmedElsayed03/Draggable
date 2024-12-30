import { Component, ViewChild, Type, ViewContainerRef, Renderer2} from '@angular/core';
import { DesignerComponent } from '../designer/designer.component';
import { HeaderComponent } from '../header/header.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { Resizable } from '../../directives/resizable.directive';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { TextComponent } from '../designer-items/Text/text.component';
import { CustomEditorComponent } from '../designer-items/custom-editor/custom-editor.component';
import { ImageComponent } from '../designer-items/image/image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesignerComponent, HeaderComponent, WorkspaceComponent, CdkDrag, Resizable],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private x = 0;
  private y = 0;
  element: any;
  rect: any;

  
  
  constructor() {}
  
  @ViewChild(WorkspaceComponent) workspace!: WorkspaceComponent;
  
    onAddComponent(type: string) {
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
        case 'image':
          component = ImageComponent;
        break;
      }
  
      if (component && this.workspace) {
        this.workspace.addComponent(component);
      }
    }
  }
