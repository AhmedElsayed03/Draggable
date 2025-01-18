import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  public areaIds: string[] = [];
  public imgIds: string[] = [];

  constructor() {}

  addAreaId(areaId: string): void {
    this.areaIds.push(areaId);
  }

  
  addImgId(imgId: string): void {
    this.imgIds.push(imgId);
  }

}