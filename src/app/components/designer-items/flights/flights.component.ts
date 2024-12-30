import { Component, Renderer2 } from '@angular/core';
import {CdkDrag, CdkDragHandle, CdkDragMove} from '@angular/cdk/drag-drop';
import { Resizable } from '../../../directives/resizable.directive';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CdkDragHandle, Resizable, CdkDrag],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

  private x = 0;
  private y = 0;
  element: any;
  rect: any;
  constructor( private renderer: Renderer2) {}

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

}
