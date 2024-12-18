import { Directive, ElementRef, Renderer2, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[Resizable]',
  standalone: true
})
export class Resizable implements AfterViewInit {
  private isResizing = false;
  private resizeDirection: string = '';
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private startLeft = 0;
  private startTop = 0;
  private resizeThreshold = 15;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;

    const onMouseMove = (event: MouseEvent) => {
      if (this.isResizing) return;

      const rect = element.getBoundingClientRect();
      const { clientX, clientY } = event;

      const isTop = clientY - rect.top <= this.resizeThreshold;
      const isRight = rect.right - clientX <= this.resizeThreshold;
      const isBottom = rect.bottom - clientY <= this.resizeThreshold;
      const isLeft = clientX - rect.left <= this.resizeThreshold;

      this.resizeDirection = '';

      if (isTop) this.resizeDirection += 'top';
      if (isRight) this.resizeDirection += 'right';
      if (isBottom) this.resizeDirection += 'bottom';
      if (isLeft) this.resizeDirection += 'left';

      if (this.resizeDirection) {
        const cursorStyle = this.getCursorStyle(this.resizeDirection);
        this.renderer.setStyle(document.body, 'cursor', cursorStyle);
      } else {
        this.renderer.setStyle(document.body, 'cursor', 'default');
      }
    };

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

    const onMouseMoveResize = (event: MouseEvent) => {
      if (!this.isResizing) return;

      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;

      if (this.resizeDirection.includes('top')) {
        this.renderer.setStyle(element, 'height', `${this.startHeight - deltaY}px`);
        this.renderer.setStyle(element, 'top', `${this.startTop + deltaY}px`);
      }
      if (this.resizeDirection.includes('right')) {
        this.renderer.setStyle(element, 'width', `${this.startWidth + deltaX}px`);
      }
      if (this.resizeDirection.includes('bottom')) {
        this.renderer.setStyle(element, 'height', `${this.startHeight + deltaY}px`);
      }
      if (this.resizeDirection.includes('left')) {
        this.renderer.setStyle(element, 'width', `${this.startWidth - deltaX}px`);
        this.renderer.setStyle(element, 'left', `${this.startLeft + deltaX}px`);
      }
    };

    const onMouseUpResize = () => {
      this.isResizing = false;
      this.resizeDirection = '';
      document.removeEventListener('mousemove', onMouseMoveResize);
      document.removeEventListener('mouseup', onMouseUpResize);
      this.renderer.setStyle(document.body, 'cursor', 'default');
    };

    this.renderer.listen(element, 'mousemove', onMouseMove);
    this.renderer.listen(element, 'mousedown', onMouseDown);
  }

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
