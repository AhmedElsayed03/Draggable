import { Component } from '@angular/core';
import { DragResizeDirective } from '../../../directives/drag-resize.directive';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [DragResizeDirective, CdkDrag],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {

}
