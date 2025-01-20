import { Component, ViewContainerRef, Type, Renderer2, ElementRef } from '@angular/core';
import { AreaComponent } from '../designer-items/area/area.component';
import { ResizeDragDirective } from '../../directives/resize-drag.directive';
import { ImgComponent } from '../designer-items/img/img.component';
import { DraggableItem } from '../../../models/draggable-item';
import { IdService } from '../../services/Id.service';
import { LinkComponent } from '../designer-items/link/link.component';
import { TextComponent } from '../designer-items/custom-editor/text.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [AreaComponent, ResizeDragDirective],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent {

  private areaCounter = 0;
  private imgCounter = 0;
  private linkCounter = 0;
  private stylesString:any;
  private textCounter = 0;

  private areaIds: string[] = [];
  private textIds: string[] = [];
  private imgIds: string[] = [];
  private linkIds: string[] = [];
  private areaComponents: Map<string, AreaComponent> = new Map();
  private imgComponents: Map<string, ImgComponent> = new Map();
  private linkComponents: Map<string, LinkComponent> = new Map();
  private textComponents: Map<string, TextComponent> = new Map();

  public itemsList: DraggableItem[] = [];

  constructor(private renderer: Renderer2,
              private viewContainerRef: ViewContainerRef,
              private StoreId: IdService) {}


    addToWorkspace(componentType: Type<any>) {
  
      const createdComponent = this.viewContainerRef.createComponent(componentType);
      const hostElement = createdComponent.location.nativeElement;

      //AREA COMPONENT
      if (componentType === AreaComponent) {
        this.areaCounter++;
        const newAreaId = `area.${this.areaCounter}`;
        this.renderer.setAttribute(hostElement, 'id', newAreaId);
        // this.renderer.setAttribute(hostElement, 'z-index', '2');
        this.areaIds.push(newAreaId);
        const instance = createdComponent.instance as AreaComponent;
        // Store reference to the created AreaComponent instance
        this.areaComponents.set(newAreaId, instance);
        // Update the service with the new areaId
        this.StoreId.addAreaId(newAreaId);
        // Append the created component directly to the WorkspaceComponent
        const workspaceElement = this.viewContainerRef.element.nativeElement;
        this.renderer.appendChild(workspaceElement, hostElement)
    
        const directive = new ResizeDragDirective(new ElementRef(hostElement));
        directive.ngAfterViewInit();

        directive.styleChange.subscribe((styles) => {
          const existing = this.itemsList.find((c) => c.id === newAreaId);
          if (existing) {
            existing.styles = styles;
          } else {
            this.itemsList.push({
              id: newAreaId,
              type :componentType.name.toString(),
              styles,
            });
          }
          console.log('Updated components list:', this.itemsList);
    
        });
      }


      //IMAGE COMPONENT
      if(componentType === ImgComponent){

        this.imgCounter++;
        const newImgId = `img.${this.imgCounter}`;
        this.renderer.setAttribute(hostElement, 'id', newImgId);
        this.imgIds.push(newImgId);
        const instance = createdComponent.instance as ImgComponent;
        this.imgComponents.set(newImgId, instance);
        this.StoreId.addImgId(newImgId);

        const workspaceElement = this.viewContainerRef.element.nativeElement;
        this.renderer.appendChild(workspaceElement, hostElement);
        
        const directive = new ResizeDragDirective(new ElementRef(hostElement));
        directive.ngAfterViewInit(); 

        instance.imgSrcChange.subscribe((imgSrc: string) => {
          console.log('Received imgSrc from ImgComponent:', imgSrc);
          directive.imgSrc = imgSrc;
          directive.styleChange.subscribe((styles) => {

              const existing = this.itemsList.find((c) => c.id === newImgId);
              if (existing) {
                existing.styles = styles;
    
              } else {
                this.itemsList.push({
                  id: newImgId,
                  type :componentType.name.toString(),
                  styles,
                });
              }
              console.log('Updated components list:', this.itemsList);
            });
        });

        // directive.ngAfterViewInit(); 
      }


      if(componentType === TextComponent){

        this.textCounter++;
        const newtextId = `text.${this.textCounter}`;
        this.renderer.setAttribute(hostElement, 'id', newtextId);
        this.textIds.push(newtextId);
        const instance = createdComponent.instance as TextComponent;
        this.textComponents.set(newtextId, instance);
        this.StoreId.addTextId(newtextId);

        const workspaceElement = this.viewContainerRef.element.nativeElement;
        this.renderer.appendChild(workspaceElement, hostElement);
        
        const directive = new ResizeDragDirective(new ElementRef(hostElement));
        directive.ngAfterViewInit(); 

        instance.TextChange.subscribe((text: string) => {
          console.log('Received text from TextComponent:', text);
          directive.text = text;
          directive.styleChange.subscribe((styles) => {

              const existing = this.itemsList.find((c) => c.id === newtextId);
              if (existing) {
                existing.styles = styles;
    
              } else {
                this.itemsList.push({
                  id: newtextId,
                  type :componentType.name.toString(),
                  styles,
                });
              }
              console.log('Updated components list:', this.itemsList);
            });
        });

        // directive.ngAfterViewInit(); 
      }

      
      //LINK COMPONENT
      if (componentType === LinkComponent) {
        this.linkCounter++;
        const newLinkId = `link.${this.linkCounter}`;
        this.renderer.setAttribute(hostElement, 'id', newLinkId);
        this.linkIds.push(newLinkId);
      
        const instance = createdComponent.instance as LinkComponent;
        this.linkComponents.set(newLinkId, instance);
        this.StoreId.addLinkId(newLinkId);
      
        // Append the host element to the workspace
        const workspaceElement = this.viewContainerRef.element.nativeElement;
        this.renderer.appendChild(workspaceElement, hostElement);
      
        // Initialize the directive
        const directive = new ResizeDragDirective(new ElementRef(hostElement));
        directive.disableResizing = true;
        directive.ngAfterViewInit();
      
        // Listen for text value changes from the component
        instance.textValueChange.subscribe((textValue: string) => {
          console.log('Received textValue from LinkComponent:', textValue);
          directive.textvalue = textValue;
      
          instance.textInputStylesChange.subscribe((styles) => {
            console.log('Updated components list:', styles);
            this.stylesString = Object.entries(styles)
          .map(([key, value]) => `${key}:${value}`)
          .join(';');
          console.log('string style:', this.stylesString);
          directive.textStyle = this.stylesString;
          })

          // Listen for style changes and update the items list
          directive.styleChange.subscribe((styles) => {

            const existing = this.itemsList.find((c) => c.id === newLinkId);
            if (existing) {
              existing.styles = styles;
  
            } else {
              this.itemsList.push({
                id: newLinkId,
                type :componentType.name.toString(),
                styles
              });
            }
            console.log('Updated components list:', this.itemsList);
          });
      });
      }
    
    }           


    addToArea(componentType: Type<any>, areaId: string) {
      const areaComponent = this.areaComponents.get(areaId);
      if (!areaComponent) {
        console.error(`Area with id ${areaId} not found.`);
        return;
      }
      areaComponent.addItem(componentType, areaId);
    }
}
