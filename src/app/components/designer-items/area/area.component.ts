import { Component, ElementRef, Input, Renderer2, Type, ViewContainerRef } from '@angular/core';
import { ResizeDragDirective } from '../../../directives/resize-drag.directive';

// declare const $: any; // Declare jQuery


@Component({
  selector: 'app-area',
  standalone: true,
  imports: [],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})

export class AreaComponent{
  
    constructor(
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2){}

        addItem(componentType: Type<any>, containmentId: string) {
          const createdComponent = this.viewContainerRef.createComponent(componentType);
          const hostElement = createdComponent.location.nativeElement;
          this.renderer.setAttribute(hostElement, 'id', '5');

          const areaElement = this.viewContainerRef.element.nativeElement;
          this.renderer.appendChild(areaElement, hostElement);
        
          const directiveInstance = new ResizeDragDirective(new ElementRef(hostElement));
          directiveInstance.containment = `#${containmentId}`;
          console.log(directiveInstance.containment);
          // directiveInstance.containment = `.workspace`;

          directiveInstance.ngAfterViewInit();
        }
      }              
      
     
      









      // private applyDirective(element: HTMLElement) {
      //   const directive = new ResizeDragDirective(new ElementRef(element));
      //   directive.ngAfterViewInit();
      // }
      



      // constructor(private elementRef: ElementRef) {}

      // ngAfterViewInit(): void {

        // // Use AfterViewInit to ensure the DOM is fully loaded before jQuery manipulates it
        // const resizableElement = this.elementRef.nativeElement;

        // $(resizableElement).resizable({
        //   handles: "n, e, s, w", // Define resizing handles
        //   containment: ".workspace" // Resizing boundary
        // }).draggable({
        //   containment: ".workspace" // Dragging boundary
        // });
      // }