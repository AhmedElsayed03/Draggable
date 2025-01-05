import { Component, ViewContainerRef, Type, Renderer2, ElementRef } from '@angular/core';
import { AreaComponent } from '../designer-items/area/area.component';
import { ResizeDragDirective } from '../../directives/resize-drag.directive';
import { ParentAreaService } from '../../services/parent-area.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
  imports: [AreaComponent, ResizeDragDirective],
})
export class WorkspaceComponent {
  private areaCounter = 0;
  public areaIds: string[] = [];
  private areaComponents: Map<string, AreaComponent> = new Map();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private parentAreaService: ParentAreaService
  ) {}

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
