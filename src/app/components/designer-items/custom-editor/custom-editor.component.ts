import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { Resizable } from '../../../directives/resizable.directive';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ContentService } from '../../../services/content.service';

@Component({
  selector: 'app-custom-editor-component',
  standalone: true,
  templateUrl: './custom-editor.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxEditorModule,
    Resizable,
    CdkDrag,
    DragDropModule,
    FormsModule
  ],
  styleUrls: ['./custom-editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomEditorComponent implements OnInit, OnDestroy {
  @Output() ContentChange = new EventEmitter<{ content?: string }>();

  editor!: Editor;
  html: string = ''; // Content of the editor

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['undo', 'redo'],
  ];

  ngOnInit(): void {
    this.editor = new Editor({
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
  }

  onEditorChange(content: string) {
    this.html = content;
    this.ContentChange.emit({ content });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
