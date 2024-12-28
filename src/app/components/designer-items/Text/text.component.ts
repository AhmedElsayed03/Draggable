import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import Quill from 'quill';

const Font: any = Quill.import('formats/font');

// Define custom font whitelist
Font.whitelist = ['arial', 'verdana', 'times-new-roman', 'courier', 'roboto']; 
Quill.register(Font, true);


@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CdkDrag, FormsModule, QuillEditorComponent],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})


export class TextComponent {
  content = '';

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Text styles
      [{ font: [] }], // Font dropdown
      [{ size: ['small', false, 'large', 'huge'] }], // Font sizes
      [{ color: [] }, { background: [] }], // Color options
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      ['clean'] // Clear formatting
    ]
  };
  

  created(editor: any) {
    console.log('Editor created:', editor);
  }
}
