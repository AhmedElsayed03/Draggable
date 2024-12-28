import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { QuillEditorComponent, QuillModules } from 'ngx-quill'; // Import only QuillEditorComponent
@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CdkDrag, FormsModule, QuillEditorComponent], // Only import QuillEditorComponent here
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  content = '';

  // Define Quill editor modules including font styles and header options
  editorModules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': ['Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Comic Sans MS', 'Roboto', 'Open Sans'] }],
      [{ 'align': [] }],
    
      ['clean']   
    ]
  };

  created(editor: any) {
    const range = editor.getSelection(true);
    // editor.insertEmbed(range.index, 'image', 'https://example.com/image.png', 'user');
  }
}
