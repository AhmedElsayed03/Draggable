  import { CommonModule } from '@angular/common';
  import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
  import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
  import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
  import { Resizable } from '../../../directives/resizable.directive';
  import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

  @Component({
    selector: 'app-custom-editor-component',
    standalone:true,
    templateUrl: './custom-editor.component.html',
    imports: [
      CommonModule,
      ReactiveFormsModule,
      NgxEditorModule,
      Resizable,
      CdkDrag, DragDropModule,
    ],
    styleUrls: ['./custom-editor.component.css'],
    encapsulation: ViewEncapsulation.None,
  })
  export class CustomEditorComponent implements OnInit, OnDestroy {
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

    form = new FormGroup({
      editorContent: new FormControl('hELLO'),
    });

    ngOnInit(): void {
      this.editor = new Editor({
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
      });
    }

    ngOnDestroy(): void {
      this.editor.destroy();
    }
  }
