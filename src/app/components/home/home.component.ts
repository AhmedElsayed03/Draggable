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
import { ResizeDragDirective } from '../../directives/resize-drag.directive';
import { ParentAreaService } from '../../services/parent-area.service';

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

  private areaCounter = 0;
  public areaIds: string[] = [];
  private areaComponents: Map<string, AreaComponent> = new Map();


  error: string = "Something went wrong!";
  areaId: string = "";
  dropdownVisible: boolean = false; // Control dropdown visibilit

  @ViewChild(WorkspaceComponent) workspace!: WorkspaceComponent;
  @ViewChild(WorkspaceComponent) elementRef!: ElementRef;
  @ViewChild('templateReference') workspaceContainer!: ElementRef;
  @ViewChild('perant', { static: false }) perantElement!: ElementRef;

  constructor(private renderer: Renderer2 , private elRef : ElementRef , private viewContainerRef: ViewContainerRef,
             private parentAreaService: ParentAreaService ) {}
  showWorkspace = true;


  ngAfterViewInit() {
    if (this.perantElement) {
      const par = document.getElementById("perant")?.childElementCount;
      const perantHtml = this.perantElement.nativeElement.ViewChild ;
      console.log('HTML content of #perant:', par);
    } else {
      console.error('Element with id "perant" is not found.');
    }
  }



  getdata(){
    var x = document.getElementById("p1");
    const perantHtml = this.perantElement.nativeElement ;

    if(perantHtml){
     // const nodeList = x.childNodes;
     // let text = "";
     // for (let i = 0; i < nodeList.length; i++) {
     //     text += nodeList[i].nodeName + "<br>";
     //   }
     //       console.log(text)'
    //  console.log(perantHtml.outerHTML)
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
      this.addToWorkspace(component);
      this.ngAfterViewInit();
    }

    if (component !== AreaComponent) {
      this.dropdownVisible = true; // Show dropdown for selecting area
      this.ngAfterViewInit();

    }
  }

  // Handle the selected area and close the dropdown
  onAreaSelected(areaId: string) {
    if (areaId === '.workspace') {
      this.addToWorkspace(ItemComponent);
    } else {
      const targetAreaId = `${areaId}`;
      this.addToArea(ItemComponent, targetAreaId);
    }
    this.dropdownVisible = false; // Hide dropdown after selection
  }


  saveAllItems() {

    if (this.workspaceContainer?.nativeElement) {
      console.log(this.workspaceContainer.nativeElement.innerHTML);
    } else {
      console.error('ElementRef is not initialized yet or invalid.');
    }

  }


      addToArea(componentType: Type<any>, areaId: string) {
        const areaComponent = this.areaComponents.get(areaId);
        if (!areaComponent) {
          console.error(`Area with id ${areaId} not found.`);
          return;
        }
        areaComponent.addItem(componentType, areaId);
      }
    
      addToWorkspace(componentType: Type<any>) {
    
        const createdComponent = this.viewContainerRef.createComponent(componentType);
        const hostElement = createdComponent.location.nativeElement;
    
        // Special handling for AreaComponent (Adding Id for each created area)
        if (componentType === AreaComponent) {
          this.areaCounter++;
          const newAreaId = `area.${this.areaCounter}`;
          this.renderer.setAttribute(hostElement, 'id', newAreaId);
          this.areaIds.push(newAreaId);
    
          // Store reference to the created AreaComponent instance
          this.areaComponents.set(newAreaId, createdComponent.instance as AreaComponent);
    
          // Update the service with the new areaId
          this.parentAreaService.addAreaId(newAreaId);
        }
    
        // Append the created component directly to the WorkspaceComponent
        const workspaceElement = this.viewContainerRef.element.nativeElement;
        this.renderer.appendChild(workspaceElement, hostElement);

        const directive = new ResizeDragDirective(new ElementRef(hostElement));


        directive.styleChange.subscribe((styles) => {
          const componentId = createdComponent.instance.id; // Assign or generate an ID for the component
          const existing = this.componentsList.find((c) => c.id === componentId);
          if (existing) {
            existing.styles = styles;
          } else {
            this.componentsList.push({
              id: componentId,
              type :componentType ,
              styles,
            });
          }
          console.log('Updated components list:', this.componentsList);

        });



        directive.ngAfterViewInit();
    
      }

}
