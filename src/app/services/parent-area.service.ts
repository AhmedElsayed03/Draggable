import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Service to store Area's Id
export class ParentAreaService {
  public areaIds: string[] = [];

  constructor() {}

  addAreaId(areaId: string): void {
    this.areaIds.push(areaId);
  }
}