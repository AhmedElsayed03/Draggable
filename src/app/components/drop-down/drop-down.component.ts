import { Component, EventEmitter, Output } from '@angular/core';
import { ParentAreaService } from '../../services/parent-area.service';
import { IdService } from '../../services/Id.service';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent {
  @Output() areaSelected = new EventEmitter<string>();

  constructor(public Ids: IdService) {}

  get areas(): string[] {
    return this.Ids.areaIds;
  }

  onAreaChange(event: any) {
    this.areaSelected.emit(event.target.value);
  }
}