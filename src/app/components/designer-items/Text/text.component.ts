import { Component, OnDestroy, OnInit } from '@angular/core';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { Resizable } from '../../../directives/resizable.directive';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [Resizable, CdkDrag,FormsModule ,NgxEditorModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent implements OnInit, OnDestroy {
  html = 'Hello world!';
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];



  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
