import { Component, ElementRef, HostListener, Input, Renderer2, Type, ViewContainerRef } from '@angular/core';
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
  
    isPickAtBottom = false;

    borderColor: string = '#000000'; // Default border color
    borderWidth: string = '0px';    // Default border width
    borderStyle: string = 'solid';  // Default border style (can be customizable)
    
    constructor(
        private viewContainerRef: ViewContainerRef,
        private renderer: Renderer2,
        private element: ElementRef){}


        @HostListener('document:mousemove', ['$event'])
        onDrag(event: MouseEvent): void {
          const hostElement = this.element.nativeElement;
          const top = hostElement.getBoundingClientRect().top;

          // Check if the top is less than 25 and adjust the pick div position
          if (top < 25) {
            this.isPickAtBottom = true;
          } else {
            this.isPickAtBottom = false;
          }
        }
        
        
        onColorChange(event: Event): void {
          const color = (event.target as HTMLInputElement).value;
          this.renderer.setStyle(this.element.nativeElement, 'background-color', color);
        }
        
        
        onRadiusChange(event: Event): void {
          const radius = (event.target as HTMLInputElement).value + 'px';
          this.renderer.setStyle(this.element.nativeElement, 'border-radius', radius);
        }
        
        onOpacityChange(event: Event): void {
          const opacity = (event.target as HTMLInputElement).value;
          this.renderer.setStyle(this.element.nativeElement, 'opacity', opacity);
        }

        onOpacityChangeSlider(event: Event): void {
          const opacity = (event.target as HTMLInputElement).value;
          
          // Get the current background color
          const currentBgColor = getComputedStyle(this.element.nativeElement).backgroundColor;
        
          // Extract RGB values from the current background color
          const rgbMatch = currentBgColor.match(/rgba?\((\d+), (\d+), (\d+)/);
        
          if (rgbMatch) {
            const [_, r, g, b] = rgbMatch; // Extracted R, G, B values
        
            // Set the new background color with the updated opacity
            const newBgColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            this.renderer.setStyle(this.element.nativeElement, 'background-color', newBgColor);
          }
        }
        
        
        onBorderColorChange(event: Event): void {
          this.borderColor = (event.target as HTMLInputElement).value;
          this.updateBorder();
        }
        
        
        onBorderWidthChange(event: Event): void {
          this.borderWidth = (event.target as HTMLInputElement).value + 'px';
          this.updateBorder();
        }
        
        updateBorder(): void {
          const borderValue = `${this.borderWidth} ${this.borderStyle} ${this.borderColor}`;
          this.renderer.setStyle(this.element.nativeElement, 'border', borderValue);
        }

        onBorderStyleChange(event: Event): void {
          this.borderStyle = (event.target as HTMLSelectElement).value;
          this.updateBorder();
        }
        


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