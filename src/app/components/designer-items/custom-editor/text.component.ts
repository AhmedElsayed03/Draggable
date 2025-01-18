import { CommonModule } from '@angular/common';
import { Component, Directive, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

import { ResizeDragDirective } from '../../../directives/resize-drag.directive';

@Component({
  selector: 'app-text-component',
  standalone: true,
  templateUrl: './text.component.html',
  imports: [ CommonModule, ReactiveFormsModule,NgxEditorModule,FormsModule,
  ],
  styleUrls: ['./text.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TextComponent implements OnInit, OnDestroy {
  @Output() TextChange = new EventEmitter<string>(); 
  @ViewChild(ResizeDragDirective, { static: false }) resizeDragDirective!: ResizeDragDirective;


  editor!: Editor;
  html: string = ''; // Content of the editor

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    // ['code', 'blockquote'],
    // ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    // ['align_left', 'align_center', 'align_right', 'align_justify'],
    // ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    // ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('Please write here'),
  });

  ngOnInit(): void {
    this.editor = new Editor({
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
  }
  onEditorChange(content: string) {
    this.html = content;
    this.TextChange.emit( this.html);
  if (this.resizeDragDirective) {
    this.resizeDragDirective.ngAfterViewInit();
  } else {
    console.warn('resizeDragDirective is not available yet.');
  }
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
