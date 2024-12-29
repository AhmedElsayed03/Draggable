import { Component, ViewChild, ViewContainerRef, Type, Renderer2, Injector, ElementRef } from '@angular/core';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { DragDropModule, CdkDragMove, DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { TextComponent } from '../designer-items/Text/text.component';
import { Resizable } from '../../directives/resizable.directive';
import { CdkDrag } from '@angular/cdk/drag-drop';

import { CustomEditorComponent } from '../designer-items/custom-editor/custom-editor.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CdkDrag, WeatherComponent, FlightsComponent, DragDropModule, Resizable],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent {
  @ViewChild('workspaceContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private x = 0;
  private y = 0;
  element: any;
  rect: any;

  constructor(
    private renderer: Renderer2,
    private dragDrop: DragDrop,
    private injector: Injector
  ) {}

  addComponent(componentType: Type<any>) {
    if (this.container) {
      this.container.createComponent(componentType);
      // const hostElement = createdComponent.location.nativeElement;
      // this.applyDirectivesAndBindings(hostElement);
      // const dragRef = this.dragDrop.createDrag(hostElement);

      // dragRef.withBoundaryElement(document.querySelector('.workspace') as HTMLElement);
      // this.applyResizableDirective(hostElement);
    }
  }

  
  private applyDirectivesAndBindings(element: HTMLElement) {
    this.renderer.setAttribute(element, 'cdkDrag', '');
    this.renderer.setAttribute(element, 'cdkDragBoundary', '.workspace');
    this.renderer.setAttribute(element, 'Resizable', '');
    this.renderer.setAttribute(element, 'class', 'cdk-drag');
    this.renderer.setAttribute(element, 'ng-reflect-boundary-element', '.workspace');
  }

  onDragMoved = (event: CdkDragMove): void => {
    const { x, y } = event.source.getFreeDragPosition();
    this.x = x;
    this.y = y;
    console.log('x:', x, 'y:', y);
    const draggableElement = event.source.element.nativeElement;
    this.renderer.setStyle(draggableElement, 'top', `${y}px`);
    this.renderer.setStyle(draggableElement, 'left', `${x}px`);
    this.renderer.setStyle(draggableElement, 'transform', 'translate3d(0, 0, 0)');
  };

  private applyResizableDirective(element: HTMLElement) {
    const resizableDirective = new Resizable({ nativeElement: element }, this.renderer);
    resizableDirective.ngAfterViewInit();
  }
}
