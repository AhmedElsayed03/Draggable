import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  public areaIds: string[] = [];
  public imgIds: string[] = [];
  public textIds: string[] = [];


  constructor() {}

  addAreaId(areaId: string): void {
    this.areaIds.push(areaId);
  }

  
  addImgId(imgId: string): void {
    this.imgIds.push(imgId);
  }

  addTextId(textId: string): void {
    this.textIds.push(textId);
  }

}