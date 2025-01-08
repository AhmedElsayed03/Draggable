import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

declare const $: any; // Declare jQuery

@Directive({
  selector: '[ResizeDrag]',
  standalone: true,
})

export class ResizeDragDirective implements AfterViewInit, OnChanges {
  @Input() containment: string = '.workspace'; // Default containment

  private resizableElement!: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.resizableElement = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.initializeResizableAndDraggable();
  }

  // ngOnInit(): void {
  //   console.log("OnInit")
  //     this.reinitializeResizableAndDraggable();
  // }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges")

    if (changes['containment'] && !changes['containment'].isFirstChange()) {
      console.log("OnChanges2")

      this.reinitializeResizableAndDraggable();
    }
  }

  private initializeResizableAndDraggable(): void {
    $(this.resizableElement)
      .resizable({
        grid: [15, 15],
        handles: 'n, e, s, w, se, sw, ne, nw',
        containment: this.containment,
      })
      .draggable({
        grid: [8, 8],
        containment: this.containment,
      });

      
  }

  private reinitializeResizableAndDraggable(): void {
    // Destroy existing functionality
    $(this.resizableElement).resizable('destroy').draggable('destroy');

    // Reinitialize with the updated containment
    this.initializeResizableAndDraggable();
  }
}




// import { AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

// declare const $: any; // Declare jQuery

// @Directive({
//   selector: '[ResizeDrag]',
//   standalone: true
// })

// export class ResizeDragDirective implements AfterViewInit {
//   @Input() containment: string = '.workspace'; // Default containment is ".workspace" - This parameter is determine the parent container

//   constructor(private elementRef: ElementRef) {}

//   ngAfterViewInit(): void {
//     const resizableElement = this.elementRef.nativeElement;

//     $(resizableElement)
//       .resizable({
//         grid: [15, 15],
//         handles: 'n, e, s, w, se, sw, ne, nw',
//         containment: this.containment,
//       })
//       .draggable({
//         grid: [1, 1],
//         containment: this.containment,
//       });
//   }
// } 