import { Component } from '@angular/core';
import { DragResizeDirective } from '../../../directives/drag-resize.directive';

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [DragResizeDirective],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.css'
})
export class ChannelsComponent {

}
