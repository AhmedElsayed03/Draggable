import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor() { }

  private contentSource = new BehaviorSubject<string>('');  
  content$ = this.contentSource.asObservable();

  setContent(content: string) {
    this.contentSource.next(content);  
  }
  
}
