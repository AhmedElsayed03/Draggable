import { Component } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';




@Component({
  selector: 'app-text',
  standalone: true,
  imports: [CdkDrag, FormsModule, HttpClientModule, AngularEditorModule],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})


export class TextComponent {
  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    fonts: [
    {class: 'arial', name: 'Arial'},
    {class: 'calibri', name: 'Calibri'},
    {class: 'comic-sans-ms', name: 'Comic Sans MS'}],
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  
}
