import { Component } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { Resizable } from '../../../directives/resizable.directive';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [Resizable, CdkDrag],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {

}
