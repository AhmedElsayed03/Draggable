import { Component, ViewChild, Type, AfterViewInit} from '@angular/core';
import { DesignerComponent } from '../designer/designer.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import {  TextComponent } from '../designer-items/custom-editor/text.component';
import { ImgComponent } from '../designer-items/img/img.component';
import { AreaComponent } from '../designer-items/area/area.component';
import { DraggableItem } from '../../../models/draggable-item';
import { DropDownComponent } from "../drop-down/drop-down.component";
import { ItemComponent } from '../designer-items/item/item.component';
import { SavingService } from '../../services/saving.service';
import { LinkComponent } from '../designer-items/link/link.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesignerComponent, WorkspaceComponent, DropDownComponent, AreaComponent, ImgComponent, ItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit   {

  componentsList: DraggableItem[] = [];
  areaId: string = "";
  dropdownVisible: boolean = false; //Control dropdown visibility
  showWorkspace = true;
  componentType!: Type<any>;

  @ViewChild(WorkspaceComponent) workspace!: WorkspaceComponent;

  constructor(private savingService:SavingService) {}

  ngAfterViewInit() {
  }


  onAddComponent(type: string) {
    let component: Type<any> | null = null;

    switch (type) {
      case 'weather':
        component = WeatherComponent;
        this.componentType = component;
        break;
      case 'flights':
        component = FlightsComponent;
        this.componentType = component;
        break;
      case 'CustomEditor':
        component = TextComponent;
        this.componentType = component;
        break;
      case 'img':
        component = ImgComponent;
        this.componentType = component;
        break;
      case 'area':
        component = AreaComponent;
        this.componentType = component;
        break;
      case 'item':
        component = ItemComponent;
        this.componentType = component;
        break;
      case 'link':
        component = LinkComponent;
        this.componentType = component;
        break;
    }

    if (component === AreaComponent) {
      this.workspace.addToWorkspace(component);
      this.ngAfterViewInit();
    }

    if (component !== AreaComponent) {
      this.dropdownVisible = true; 
      this.ngAfterViewInit();

    }
  }

  onAreaSelected(areaId: string) {
    if (areaId === '.workspace') {
      this.workspace.addToWorkspace(this.componentType);
    } else {
      const targetAreaId = `${areaId}`;
      this.workspace.addToArea(this.componentType, targetAreaId);
    }
    this.dropdownVisible = false; // Hide dropdown after selection
  }
  
  save(){
    this.savingService.saveItems(this.workspace.itemsList)
  }
}
