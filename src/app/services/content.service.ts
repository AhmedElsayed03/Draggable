import { AfterViewInit, EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService implements AfterViewInit {

  @Output() ContentChange = new EventEmitter<{ content?: string }>();

  private contentSource = new BehaviorSubject<string>('');  
  content$ = this.contentSource.asObservable();

  constructor() { }

  ngAfterViewInit(): void {
    this.setContent('default content');
  }

  setContent(content: string) {
    this.contentSource.next(content); 
    this.ContentChange.emit({ content });   
  }
}
