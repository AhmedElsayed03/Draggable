import { Component } from '@angular/core';
import { ListItem } from '../../../../models/list-item';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  items: ListItem[] = [{imageSrc:"../../../../assets/tv.png", description:"Channel 1",  routerLink:"link"}]

  
}
