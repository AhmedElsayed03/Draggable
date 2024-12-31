import { Component , OnInit, ElementRef, AfterViewInit} from '@angular/core';

// declare const $: any; // Declare jQuery


@Component({
  selector: 'app-area',
  standalone: true,
  imports: [],
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {

    // // Use AfterViewInit to ensure the DOM is fully loaded before jQuery manipulates it
    // const resizableElement = this.elementRef.nativeElement;

    // $(resizableElement).resizable({
    //   handles: "n, e, s, w", // Define resizing handles
    //   containment: ".workspace" // Resizing boundary
    // }).draggable({
    //   containment: ".workspace" // Dragging boundary
    // });
  }
}