import { Component, OnInit, ElementRef } from '@angular/core';

declare const $: any; // Declare jQuery


@Component({
  selector: 'app-img',
  standalone: true,
  imports: [],
  templateUrl: './img.component.html',
  styleUrl: './img.component.css'
})
export class ImgComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const resizableElement = this.elementRef.nativeElement.querySelector('#resizable');

    $(resizableElement).resizable({
      handles: "n, e, s, w" // Define resizable handles
    }).draggable();
  }
}