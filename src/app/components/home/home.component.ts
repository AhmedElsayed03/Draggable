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
import { ImgComponent } from '../designer-items/img/img.component';
import { AreaComponent } from '../designer-items/area/area.component';
import { DraggableItem } from '../../../models/draggable-item';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesignerComponent, HeaderComponent, WorkspaceComponent, CdkDrag, Resizable],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  private nextId = 1;
  componentsList: DraggableItem[] = [];

  @ViewChild(WorkspaceComponent) workspace!: WorkspaceComponent;

  constructor(private renderer: Renderer2) {}

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
      case 'img':
        component = ImgComponent;
        break;
      case 'area':
        component = AreaComponent;
        break;
    }

    if (component && this.workspace) {
      const newComponent = new DraggableItem(this.nextId++, type);
    
      const createdElement = this.workspace.addComponent(component);
    
      if (createdElement instanceof HTMLElement) {

        const rect = createdElement.getBoundingClientRect();
        newComponent.position = { x: rect.x, y: rect.y };
        newComponent.size = { width: rect.width, height: rect.height };
    
        console.log('Saving component data:', newComponent);
    
        this.componentsList.push(newComponent);
      } else {
        console.error('createdElement is not an HTMLElement.');
      }
    }
    
  }

  saveComponentById(id: number) {


  }
}