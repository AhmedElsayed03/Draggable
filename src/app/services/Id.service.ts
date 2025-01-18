import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  public areaIds: string[] = [];
  public imgIds: string[] = [];
  public linkIds: string[] = [];

  constructor() {}

  addAreaId(areaId: string): void {
    this.areaIds.push(areaId);
  }

  
  addImgId(imgId: string): void {
    this.imgIds.push(imgId);
  }


  addLinkId(linkId: string): void {
    this.linkIds.push(linkId);
  }

}