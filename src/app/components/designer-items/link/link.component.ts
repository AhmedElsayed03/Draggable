import { Component, ElementRef, EventEmitter, HostListener, Output, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {

 
    borderColor: string = '#000000'; // Default border color
    borderWidth: string = '0px';    // Default border width
    borderStyle: string = 'solid';  // Default border style (can be customizable)
    @ViewChild('textInput') myInput!: ElementRef;
    @Output() textValueChange = new EventEmitter<string>(); // Emit changes to textValue
    @Output() textInputStylesChange = new EventEmitter<{ [key: string]: string }>();


    constructor(
        private renderer: Renderer2,
        private element: ElementRef){}


        emitTextInputStyles(): void {
          const input = this.myInput.nativeElement;
          const computedStyles = getComputedStyle(input);
        
          // Extract specific styles or include all
          const styles = {
            color: computedStyles.color,
            backgroundColor: computedStyles.backgroundColor,
            borderRadius: computedStyles.borderRadius,
            fontSize: computedStyles.fontSize,
            fontFamily: computedStyles.fontFamily,
            fontWeight: computedStyles.fontWeight,
            fontStyle: computedStyles.fontStyle,
            position: computedStyles.position,
            top: computedStyles.top,
            left: computedStyles.left,
            width: computedStyles.width,
            height: computedStyles.height,
            // Add more properties as needed
          };

          this.textInputStylesChange.emit(styles);
        }

        
        onColorChange(event: Event): void {
          const color = (event.target as HTMLInputElement).value;
          this.renderer.setStyle(this.element.nativeElement, 'background-color', color);
          this.emitTextInputStyles();
        }

        onBackgroundColorChange(event: Event): void {
          const color = (event.target as HTMLInputElement).value;
          this.renderer.setStyle(this.myInput.nativeElement, 'background-color', color);
          this.emitTextInputStyles();
        }

        onTextColorChange(event: Event): void {
          const color = (event.target as HTMLInputElement).value;
          this.renderer.setStyle(this.myInput.nativeElement, 'color', color);
          this.emitTextInputStyles();
        }
        
        onRadiusChange(event: Event): void {
          const radius = (event.target as HTMLInputElement).value + 'px';
          this.renderer.setStyle(this.myInput.nativeElement, 'border-radius', radius);
          this.emitTextInputStyles();
        }
        

        onFontSizeChange(event: Event): void {
          const font = (event.target as HTMLInputElement).value + 'px';
          this.renderer.setStyle(this.myInput.nativeElement, 'font-size', font);
          this.adjustInputDimensions();
          this.emitTextInputStyles();
        } 

        adjustInputDimensions(): void {
          const input = this.myInput.nativeElement;
          const text = input.value || input.placeholder;
          const span = document.createElement('span');
      
          // Set styles to mimic the input's appearance
          span.style.fontFamily = getComputedStyle(input).fontFamily;
          span.style.fontSize = getComputedStyle(input).fontSize;
          span.style.padding = getComputedStyle(input).padding;
          span.style.whiteSpace = 'pre'; // Preserve spaces
          span.textContent = text;
      
          // Temporarily add the span to the DOM for measurement
          document.body.appendChild(span);
          const textWidth = span.offsetWidth;
          const textHeight = span.offsetHeight;
          document.body.removeChild(span);
      
          // Update input dimensions
          this.renderer.setStyle(input, 'width', `${textWidth}px`); // Add padding
          this.renderer.setStyle(input, 'height', `${textHeight + 10}px`); // Add vertical padding
          this.emitTextInputStyles();
        }

        onFontFamilyChange(event: Event): void {
          const fontFamily = (event.target as HTMLInputElement).value;
          this.renderer.setStyle(this.myInput.nativeElement, 'font-family', fontFamily);
          this.adjustInputDimensions();
          this.emitTextInputStyles();
        }


        onInputResize(event: Event): void {
          this.adjustInputDimensions();
          this.emitTextInputStyles();
        }


        onOpacityChangeSlider(event: Event): void {
          const opacity = (event.target as HTMLInputElement).value;
          
          // Get the current background color
          const currentBgColor = getComputedStyle(this.myInput.nativeElement).backgroundColor;
        
          // Extract RGB values from the current background color
          const rgbMatch = currentBgColor.match(/rgba?\((\d+), (\d+), (\d+)/);
        
          if (rgbMatch) {
            const [_, r, g, b] = rgbMatch; // Extracted R, G, B values
        
            // Set the new background color with the updated opacity
            const newBgColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            this.renderer.setStyle(this.myInput.nativeElement, 'background-color', newBgColor);
          }
          this.emitTextInputStyles();
        }

        toggleBold(): void {
          const currentFontWeight = getComputedStyle(this.myInput.nativeElement).fontWeight;
          const newFontWeight = currentFontWeight === 'bold' || currentFontWeight === '700' ? 'normal' : 'bold';
          this.renderer.setStyle(this.myInput.nativeElement, 'font-weight', newFontWeight);
          this.adjustInputDimensions();
          this.emitTextInputStyles();

        }
        
        toggleItalic(): void {
          const currentFontStyle = getComputedStyle(this.myInput.nativeElement).fontStyle;
          const newFontStyle = currentFontStyle === 'italic' ? 'normal' : 'italic';
          this.renderer.setStyle(this.myInput.nativeElement, 'font-style', newFontStyle);
          this.adjustInputDimensions();
          this.emitTextInputStyles();
        }
        
        
}
