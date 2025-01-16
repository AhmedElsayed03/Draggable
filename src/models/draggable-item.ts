export class  DraggableItem {
  id: string;
  type?: string;     
  styles?: {
      content?: string;
      style: string;
      width: string;
      height: string;
      top: string;
      left: string;
    };
  
  constructor(id: string, type: string, styles?: {content?: string; width: string; height: string; top: string; left: string; style: string;} ) {
      this.id = id;
      this.type = type;
      this.styles = styles;
    }
}
