import { Component, ViewContainerRef, Type, Renderer2, ElementRef } from '@angular/core';
import { AreaComponent } from '../designer-items/area/area.component';
import { ResizeDragDirective } from '../../directives/resize-drag.directive';
import { ImgComponent } from '../designer-items/img/img.component';
import { DraggableItem } from '../../../models/draggable-item';
import { IdService } from '../../services/Id.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [AreaComponent, ResizeDragDirective],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent {

  private areaCounter = 0;
  private imgCounter = 0;
  public areaIds: string[] = [];
  public imgIds: string[] = [];
  private areaComponents: Map<string, AreaComponent> = new Map();
  private imgComponents: Map<string, ImgComponent> = new Map();
  itemsList: DraggableItem[] = [];

  constructor(private renderer: Renderer2,
              private viewContainerRef: ViewContainerRef,
              private StoreId: IdService) {}

    addToWorkspace(componentType: Type<any>) {
  
      const createdComponent = this.viewContainerRef.createComponent(componentType);
      const hostElement = createdComponent.location.nativeElement;
      
      //AREA COMPONENT
      // Special handling for AreaComponent (Adding Id for each created area)
      if (componentType === AreaComponent) {
        this.areaCounter++;
        const newAreaId = `area.${this.areaCounter}`;
        this.renderer.setAttribute(hostElement, 'id', newAreaId);
        this.areaIds.push(newAreaId);
        // Store reference to the created AreaComponent instance
        this.areaComponents.set(newAreaId, createdComponent.instance as AreaComponent);
        // Update the service with the new areaId
        this.StoreId.addAreaId(newAreaId);
        // Append the created component directly to the WorkspaceComponent
        const workspaceElement = this.viewContainerRef.element.nativeElement;
        this.renderer.appendChild(workspaceElement, hostElement)
    
        const directive = new ResizeDragDirective(new ElementRef(hostElement));
        directive.ngAfterViewInit();
      }


      //IMAGE COMPONENT
      // Special handling for ImgComponent ()
      if(componentType === ImgComponent){

        this.imgCounter++;
        const newImgId = `img.${this.imgCounter}`;
        this.renderer.setAttribute(hostElement, 'id', newImgId);
        this.areaIds.push(newImgId);
        const instance = createdComponent.instance as ImgComponent;
        this.imgComponents.set(newImgId, instance);
        this.StoreId.addImgId(newImgId);

        const workspaceElement = this.viewContainerRef.element.nativeElement;
        this.renderer.appendChild(workspaceElement, hostElement);
        
        const directive = new ResizeDragDirective(new ElementRef(hostElement));
        directive.ngAfterViewInit(); 

        instance.imgSrcChange.subscribe((imgSrc: string) => {
          console.log('Received imgSrc from ImgComponent:', imgSrc);
          directive.imgSrc = imgSrc;
          directive.styleChange.subscribe((styles) => {

              const existing = this.itemsList.find((c) => c.id === newImgId);
              if (existing) {
                existing.styles = styles;
    
              } else {
                this.itemsList.push({
                  id: newImgId,
                  type :componentType.name.toString(),
                  styles,
                });
              }
              console.log('Updated components list:', this.itemsList);
            });
        });

        // directive.ngAfterViewInit(); 
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
}
