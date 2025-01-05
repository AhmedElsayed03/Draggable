import { Component, ViewChild, Type } from '@angular/core';
import { DesignerComponent } from '../designer/designer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { TextComponent } from '../designer-items/Text/text.component';
import { CustomEditorComponent } from '../designer-items/custom-editor/custom-editor.component';
import { ImageComponent } from '../designer-items/image/image.component';
import { ImgComponent } from '../designer-items/img/img.component';
import { AreaComponent } from '../designer-items/area/area.component';
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
export class HomeComponent {

  error: string = "Something went wrong!";
  areaId: string = "";
  dropdownVisible: boolean = false; // Control dropdown visibility

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
      case 'img':
        component = ImgComponent;
        break;
      case 'area':
        component = AreaComponent;
        break;
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
