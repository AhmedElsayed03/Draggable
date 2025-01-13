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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesignerComponent, WorkspaceComponent, AlertComponent, HttpClientModule ,  DropDownComponent, AreaComponent, ImgComponent, ItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit   {
  private nextId = 1;
  itemsList: DraggableItem[] = [];

  private areaCounter = 0;
  private ComponentCounter = 0;

  public areaIds: string[] = [];
  private areaComponents: Map<string, AreaComponent> = new Map();

  componentType!: Type<any>;
  content: string = '';

  error: string = "Something went wrong!";
  areaId: string = "";
  dropdownVisible: boolean = false; // Control dropdown visibilit

  @ViewChild(WorkspaceComponent) workspace!: WorkspaceComponent;
  @ViewChild(WorkspaceComponent) elementRef!: ElementRef;
  @ViewChild('templateReference') workspaceContainer!: ElementRef;
  @ViewChild('perant', { static: false }) perantElement!: ElementRef;

  constructor(private renderer: Renderer2 , private elRef : ElementRef , private viewContainerRef: ViewContainerRef,
             private parentAreaService: ParentAreaService , private http: HttpClient ,private contentService: ContentService ) {}
  showWorkspace = true;


  ngOnInit(): void {

  }

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
       
 }

  onAddComponent(type: string) {
    let component!: Type<any>;
    switch (type) {
      case 'weather':
        component = WeatherComponent;
        this.componentType = component;
        break;
      case 'flights':
        component = FlightsComponent;
        this.componentType = component;
        break;
      case 'text':
        component = TextComponent;
        this.componentType = component;
        break;
      case 'CustomEditor':
        component = CustomEditorComponent;
        this.componentType = component;
        break;
      case 'image':
        component = ImageComponent;
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

  onAreaSelected(areaId: string) {
    if (areaId === '.workspace') {
      this.addToWorkspace(this.componentType);
    } else {
      const targetAreaId = `${areaId}`;
      this.addToArea(this.componentType, targetAreaId);
    }
    this.dropdownVisible = false; // Hide dropdown after selection
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
    this.ComponentCounter++;
    const newComponentId = `${componentType.name }_${this.ComponentCounter}`;
    hostElement.setAttribute('newComponentId', newComponentId);


    if (componentType === AreaComponent) {
      this.areaCounter++;
      const newAreaId = `area.${this.areaCounter}`;
      this.renderer.setAttribute(hostElement, 'id', newAreaId);
      this.areaIds.push(newAreaId);

      this.areaComponents.set(newAreaId, createdComponent.instance as AreaComponent);

      this.parentAreaService.addAreaId(newAreaId);
    }

    const workspaceElement = this.viewContainerRef.element.nativeElement;
    this.renderer.appendChild(workspaceElement, hostElement);

    const directive = new ResizeDragDirective(new ElementRef(hostElement));
    
    directive.styleChange.subscribe((styles) => {
      const componentId = newComponentId;
      
      this.contentService.content$.subscribe((content) => {
        this.content = content;     

        const existing = this.itemsList.find((c) => c.id === componentId);
        console.log(componentId)
        if (existing) {
          existing.styles = styles;
          existing.content = this.content;  
        } else {
          this.itemsList.push({
            id: componentId,
            type: componentType.name.toString(),
            content: "",
            styles,
          });  
        }
    
        console.log('Updated components list:', this.itemsList);
      });
    });
    
    directive.ngAfterViewInit(); 
  }
  save(){
      const items = Array.from(this.itemsList);
      console.log(items)
      if (items.length === 0) {
        console.log('No changes to save.');
        return;
      }
  
      this.http.post('https://localhost:7045/api/DraggableItems/save', this.itemsList).subscribe({
        next: (response) => {
          console.log('Items saved successfully!', response);
          // this.itemsList.Clear(); // Clear the modified items set after saving
        },
        error: (err) => console.error('Error saving items:', err),  
      });
      
  }
}
