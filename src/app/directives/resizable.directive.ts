import { Directive, ElementRef, Renderer2, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[Resizable]',
  standalone: true
})

export class Resizable implements AfterViewInit {
  private isResizing = false; //Tracks whether the user is currently resizing the element
  private resizeDirection: string = ''; //Indicates the direction of the resizing (e.g., top, right, bottom, left).
  private startX = 0; //Mouse's initial position at the start of resizing.
  private startY = 0;
  private startWidth = 0; //Element's dimensions at the start of resizing.
  private startHeight = 0;
  private startLeft = 0; //Element's position at the start of resizing.
  private startTop = 0;
  private resizeThreshold = 5; //Distance (in pixels) from the edge of the element where resizing is activated.

  

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;

    const onMouseMove = (event: MouseEvent) => {
      if (this.isResizing) return;

      const rect = element.getBoundingClientRect();
      const { clientX, clientY } = event;

      this.resizeDirection = '';
      const isTop = clientY - rect.top <= this.resizeThreshold;
      const isRight = rect.right - clientX <= this.resizeThreshold;
      const isBottom = rect.bottom - clientY <= this.resizeThreshold;
      const isLeft = clientX - rect.left <= this.resizeThreshold;

      if (isTop) this.resizeDirection += 'top';
      if (isRight) this.resizeDirection += 'right';
      if (isBottom) this.resizeDirection += 'bottom';
      if (isLeft) this.resizeDirection += 'left';

      if (this.resizeDirection) {
        const cursorStyle = this.getCursorStyle(this.resizeDirection);
        this.renderer.setStyle(element, 'cursor', cursorStyle);
      } else {
        this.renderer.setStyle(element, 'cursor', 'default');
      }

    };

    //Event when Clicking
    const onMouseDown = (event: MouseEvent) => {
      if (this.resizeDirection) {
        this.isResizing = true;

        this.startX = event.clientX;
        this.startY = event.clientY;
        this.startWidth = element.offsetWidth;
        this.startHeight = element.offsetHeight;
        this.startLeft = element.offsetLeft;
        this.startTop = element.offsetTop;

        document.addEventListener('mousemove', onMouseMoveResize);
        document.addEventListener('mouseup', onMouseUpResize);
      }
    };
    
      
  // Event when mouse clicked and moving
  const onMouseMoveResize = (event: MouseEvent) => {
  const rect = element.getBoundingClientRect();
  const parentRect = element.parentElement.getBoundingClientRect(); // Get parent dimensions (app-workspace)

  if (!this.isResizing || !parentRect) return;

  const deltaX = event.clientX - this.startX;
  const deltaY = event.clientY - this.startY;

  if (this.resizeDirection.includes('top')) {
    const newTop = this.startTop + deltaY;
    const newHeight = this.startHeight - deltaY;

    console.log("Parent Top: " + parentRect.top);
    console.log("Top: " + rect.top);
    if (newTop >= 0) {
      this.renderer.setStyle(element, 'height', `${newHeight}px`);
      this.renderer.setStyle(element, 'top', `${newTop}px`);
    }
  }

  if (this.resizeDirection.includes('right')) {
    const newWidth = this.startWidth + deltaX;

    if (rect.left + newWidth <= parentRect.right) {
      this.renderer.setStyle(element, 'width', `${newWidth}px`);
    }
  }

  if (this.resizeDirection.includes('bottom')) {
    const newHeight = this.startHeight + deltaY;
    if (rect.top + newHeight <= parentRect.bottom) {
      this.renderer.setStyle(element, 'height', `${newHeight}px`);
    }
  }

  if (this.resizeDirection.includes('left')) {
    const newLeft = this.startLeft + deltaX;
    const newWidth = this.startWidth - deltaX;

    if (newLeft >= 0) {
      this.renderer.setStyle(element, 'width', `${newWidth}px`);
      this.renderer.setStyle(element, 'left', `${newLeft}px`);
    }
  }
  
};


    //Event when Clicking is released after resizing
    const onMouseUpResize = () => {
      this.isResizing = false;
      this.resizeDirection = '';
      document.removeEventListener('mousemove', onMouseMoveResize);
      document.removeEventListener('mouseup', onMouseUpResize);
      this.renderer.setStyle(element, 'cursor', 'default');
    };


    this.renderer.listen(element, 'mousemove', onMouseMove);
    this.renderer.listen(element, 'mousedown', onMouseDown);

  } //Closing bracket of AfterViewInit





  private getCursorStyle(direction: string): string {
    switch (direction) {
      case 'top': return 'ns-resize';
      case 'right': return 'ew-resize';
      case 'bottom': return 'ns-resize';
      case 'left': return 'ew-resize';
      case 'topright':
      case 'bottomleft': return 'nesw-resize';
      case 'topleft':
      case 'bottomright': return 'nwse-resize';
      default: return 'default';
    }
  }
}
