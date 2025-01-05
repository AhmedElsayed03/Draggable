import { Component, EventEmitter, Output } from '@angular/core';
import { ParentAreaService } from '../../services/parent-area.service';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent {
  @Output() areaSelected = new EventEmitter<string>();

  constructor(public parentAreaService: ParentAreaService) {}

  get areas(): string[] {
    return this.parentAreaService.areaIds;
  }

  onAreaChange(event: any) {
    this.areaSelected.emit(event.target.value);
  }
}