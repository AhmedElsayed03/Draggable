import { Component, ViewChild  } from '@angular/core';
import { DesignerComponent } from '../designer/designer.component';
import { HeaderComponent } from '../header/header.component';
import { WorkspaceComponent } from '../workspace/workspace.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesignerComponent, HeaderComponent, WorkspaceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(WorkspaceComponent) workspace!: WorkspaceComponent;

  onAddComponent(type: string) {
    this.workspace.addComponent(type);
  }
}
