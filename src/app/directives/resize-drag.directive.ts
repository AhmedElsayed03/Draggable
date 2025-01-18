import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

declare const $: any; // Declare jQuery

@Directive({
  selector: '[ResizeDrag]',
  standalone: true,
})
export class ResizeDragDirective implements AfterViewInit {
  @Input() containment: string = '.workspace'; // Default containment is ".workspace"
  @Input() imgSrc: string = ''; // Add imgSrc as an input
  @Input() textvalue: string = ''; // Add textValue as an input
  @Input() textStyle: string = ''; // Add textValue as an input  
  @Input() disableResizing: boolean = false; // Input to disable resizing
  @Output() styleChange = new EventEmitter<{ width: string; height: string; top: string; left: string; style: string; content?: string }>();
  @Input() content: string = 'No Content';

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const resizableElement = this.elementRef.nativeElement;

    const configuration: Object = {
      grid: [10, 10],
      handles: this.disableResizing ? '' : 'n, e, s, w, se, sw, ne, nw', // Disable handles if resizing is disabled
      containment: this.containment,

      stop: (event: Event, ui: any) => {
        const inlineStyles: { [key: string]: string } = {};

        const computedStyles = window.getComputedStyle(resizableElement);
        const tempElement = document.createElement(resizableElement.tagName);
        document.body.appendChild(tempElement);
        const defaultStyles = window.getComputedStyle(tempElement);

        Array.from(computedStyles).forEach((property) => {
          if (computedStyles.getPropertyValue(property) !== defaultStyles.getPropertyValue(property)) {
            inlineStyles[property] = computedStyles.getPropertyValue(property);
          }
        });

        document.body.removeChild(tempElement);

        const inlineStyleString = Object.entries(inlineStyles) 
          .map(([key, value]) => `${key}:${value}`)
          .join(';');

        console.log(inlineStyleString);
        this.styleChange.emit({
          width: computedStyles.width,
          height: computedStyles.height,
          top: computedStyles.top,
          left: computedStyles.left,
          style: this.textStyle,
          content: this.textvalue|| this.imgSrc || this.content
        });
      },
    };

    if (!this.disableResizing) {
      $(resizableElement).resizable(configuration); // Only enable resizing if not disabled
    }

    $(resizableElement).draggable(configuration); // Enable dragging
  }
}

  // const computedStyles = window.getComputedStyle(resizableElement);
  // const elementHTML = resizableElement.firstElementChild;
  // console.log('HTML content of the element:', HTML);

  
  
  
  
  // import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
  
// declare const $: any; // Declare jQuery

// @Directive({
//   selector: '[ResizeDrag]',
//   standalone: true,
// })

// export class ResizeDragDirective implements AfterViewInit, OnChanges {
//   @Input() containment: string = '.workspace'; // Default containment

//   private resizableElement!: HTMLElement;

//   constructor(private elementRef: ElementRef) {
//     this.resizableElement = this.elementRef.nativeElement;
//   }

//   ngAfterViewInit(): void {
//     this.initializeResizableAndDraggable();
//   }

//   // ngOnInit(): void {
//   //   console.log("OnInit")
//   //     this.reinitializeResizableAndDraggable();
//   // }

//   ngOnChanges(changes: SimpleChanges): void {
//     console.log("OnChanges")

//     if (changes['containment'] && !changes['containment'].isFirstChange()) {
//       console.log("OnChanges2")

//       this.reinitializeResizableAndDraggable();
//     }
//   }

//   private initializeResizableAndDraggable(): void {
//     $(this.resizableElement)
//       .resizable({
//         grid: [15, 15],
//         handles: 'n, e, s, w, se, sw, ne, nw',
//         containment: this.containment,
//       })
//       .draggable({
//         grid: [8, 8],
//         containment: this.containment,
//       });

      
//   }

//   private reinitializeResizableAndDraggable(): void {
//     // Destroy existing functionality
//     $(this.resizableElement).resizable('destroy').draggable('destroy');

//     // Reinitialize with the updated containment
//     this.initializeResizableAndDraggable();
//   }
// }


