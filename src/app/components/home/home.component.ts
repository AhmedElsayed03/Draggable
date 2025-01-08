import { Component, ViewChild, Type, ViewContainerRef, Renderer2, ElementRef, AfterViewInit} from '@angular/core';
import { DesignerComponent } from '../designer/designer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { TextComponent } from '../designer-items/Text/text.component';
import { CustomEditorComponent } from '../designer-items/custom-editor/custom-editor.component';
import { ImageComponent } from '../designer-items/image/image.component';
import { ImgComponent } from '../designer-items/img/img.component';
import { AreaComponent } from '../designer-items/area/area.component';
import { DraggableItem } from '../../../models/draggable-item';

import { AlertComponent } from '../../shared/alert/alert.component';
import { DropDownComponent } from "../drop-down/drop-down.component";
import { ItemComponent } from '../designer-items/item/item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesignerComponent, WorkspaceComponent, AlertComponent, DropDownComponent, AreaComponent, ImgComponent, ItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit   {
  private nextId = 1;
  componentsList: DraggableItem[] = [];



  error: string = "Something went wrong!";
  areaId: string = "";
  dropdownVisible: boolean = false; // Control dropdown visibility


  @ViewChild(WorkspaceComponent) workspace!: WorkspaceComponent;
  @ViewChild(WorkspaceComponent) elementRef!: ElementRef;

  @ViewChild('templateReference') workspaceContainer!: ElementRef;

  constructor(private renderer: Renderer2 , private elRef : ElementRef ) {}
  showWorkspace = true;


  ngAfterViewInit() {
    if (this.elementRef) {
      console.log(this.elementRef.nativeElement.innerHTML);
    } else {
      console.error('WorkspaceComponent is not initialized yet.');
    }
  }

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
        console.log(this.elementRef.nativeElement.innerHTML);


    
        this.componentsList.push(newComponent);
      } else {
        console.error('createdElement is not an HTMLElement.');
      }
    }
    
  }

  saveAllItems() {

    if (this.workspaceContainer?.nativeElement) {
      console.log(this.workspaceContainer.nativeElement.innerHTML);
    } else {
      console.error('ElementRef is not initialized yet or invalid.');
    }

  }
}
      case 'item':
        component = ItemComponent;
        break;
    }

    if (component === AreaComponent) {
      this.workspace.addToWorkspace(component);
    }

    if (component !== AreaComponent) {
      this.dropdownVisible = true; // Show dropdown for selecting area
    }
  }

  // Handle the selected area and close the dropdown
  onAreaSelected(areaId: string) {
    if (areaId === '.workspace') {
      this.workspace.addToWorkspace(ItemComponent);
    } else {
      const targetAreaId = `${areaId}`;
      this.workspace.addToArea(ItemComponent, targetAreaId);
    }
    this.dropdownVisible = false; // Hide dropdown after selection
  }
}
