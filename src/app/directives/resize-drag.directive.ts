import { Directive, ElementRef, Injector } from '@angular/core';

declare const $: any; // Declare jQuery


@Directive({
  selector: '[ResizeDrag]',
  standalone: true
})
export class ResizeDragDirective {

  constructor(private elementRef: ElementRef, private injector: Injector) { }
  ngAfterViewInit(): void {
    
    const resizableElement = this.elementRef.nativeElement;

    $(resizableElement).resizable({
      handles: "n, e, s, w", // Define resizing handles
      containment: ".workspace" // Resizing boundary
    }).draggable({grid: [ 20, 20 ], //Dragging each 10 pixels
      containment: ".workspace" // Dragging boundary
    });
  }
}
