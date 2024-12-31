import { Component, ViewChild, ViewContainerRef, Type, Renderer2, Injector, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { WeatherComponent } from '../designer-items/weather/weather.component';
import { FlightsComponent } from '../designer-items/flights/flights.component';
import { DragDropModule, CdkDragMove, DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { TextComponent } from '../designer-items/Text/text.component';
import { Resizable } from '../../directives/resizable.directive';
import { CdkDrag } from '@angular/cdk/drag-drop';

import { CustomEditorComponent } from '../designer-items/custom-editor/custom-editor.component';
import { ImageComponent } from '../designer-items/image/image.component';
import { ImgComponent } from '../designer-items/img/img.component';
import { AreaComponent } from '../designer-items/area/area.component';
import { ResizeDragDirective } from '../../directives/resize-drag.directive';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CdkDrag, WeatherComponent, FlightsComponent, DragDropModule, Resizable, TextComponent, CustomEditorComponent, ImageComponent, ImgComponent, AreaComponent, ResizeDragDirective],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent {
  @ViewChild('workspaceContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private injector: Injector, private renderer: Renderer2) {}

  addComponent(componentType: Type<any>) {
    if (this.container) {
      const createdComponent = this.container.createComponent(componentType);
      const hostElement = createdComponent.location.nativeElement;
      this.applyDirective(hostElement);
    }
  }

  private applyDirective(element: HTMLElement) {
    const directive = new ResizeDragDirective(new ElementRef(element), this.injector);
    directive.ngAfterViewInit();
  }
}

 

  // dragRef.withBoundaryElement(document.querySelector('.workspace') as HTMLElement);
  // this.applyResizableDirective(hostElement);
  
  

  // onDragMoved = (event: CdkDragMove): void => {
  //   const { x, y } = event.source.getFreeDragPosition();
  //   this.x = x;
  //   this.y = y;
  //   console.log('x:', x, 'y:', y);
  //   const draggableElement = event.source.element.nativeElement;
  //   this.renderer.setStyle(draggableElement, 'top', `${y}px`);
  //   this.renderer.setStyle(draggableElement, 'left', `${x}px`);
  //   this.renderer.setStyle(draggableElement, 'transform', 'translate3d(0, 0, 0)');
  // };

  // private applyResizableDirective(element: HTMLElement) {
  //   const resizableDirective = new Resizable({ nativeElement: element }, this.renderer);
  //   resizableDirective.ngAfterViewInit();
  // }

