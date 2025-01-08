import { Component, ViewContainerRef, Type, Renderer2, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { AreaComponent } from '../designer-items/area/area.component';
import { ResizeDragDirective } from '../../directives/resize-drag.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DraggableItem } from '../../../models/draggable-item';
import { ParentAreaService } from '../../services/parent-area.service';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { Resizable } from '../../directives/resizable.directive';
import { TextComponent } from '../designer-items/Text/text.component';
import { CustomEditorComponent } from '../designer-items/custom-editor/custom-editor.component';
import { ImageComponent } from '../designer-items/image/image.component';
import { ImgComponent } from '../designer-items/img/img.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [AreaComponent, ResizeDragDirective],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent implements OnInit {
  @ViewChild('workspaceContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private areaCounter = 0;
  public areaIds: string[] = [];
  private areaComponents: Map<string, AreaComponent> = new Map();


  draggableItems: DraggableItem[] = []; // List of all draggable items
  modifiedItems: Set<DraggableItem> = new Set(); // Track only modified items



  constructor(private injector: Injector, private renderer: Renderer2 ,private http: HttpClient , private viewContainerRef: ViewContainerRef,
    private parentAreaService: ParentAreaService) {}
  ngOnInit(): void {

    }
    




    onDragMoved(event: any, item: DraggableItem) {
      const { x, y } = event.source.getFreeDragPosition();
      item.position = { x, y };
      this.modifiedItems.add(item); 
    }
  
    saveItems() {

    }




    saveAllItems() {
      const itemsToSave = Array.from(this.modifiedItems);
      if (itemsToSave.length === 0) {
        console.log('No changes to save.');
        return;
      }
  
      this.http.post('https://localhost:7040/api/DraggableItems/save', itemsToSave).subscribe({
        next: (response) => {
          console.log('Items saved successfully!', response);
          this.modifiedItems.clear(); // Clear the modified items set after saving
        },
        error: (err) => console.error('Error saving items:', err),
      });
    }
  
    // loadItems() {
    //   this.http.get<DraggableItem[]>('https://localhost:7045/api/draggable-items').subscribe({
    //     next: (items) => (this.draggableItems = items),
    //     error: (err) => console.error('Error loading items:', err),
    //   });
    // }

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
      directive.ngAfterViewInit();
  
    }
}
