export class  DraggableItem {
    id: string;
    type?: any;     
    styles?: {
        width: string;
        height: string;
        top: string;
        left: string;
      };
    content?: string;  
    
    constructor(id: string, type: string, styles?: {width: string; height: string; top: string;left: string;}, content?: string ) {
        this.id = id;
        this.type = type;
        this.styles =styles;
        this.content = this.content;
      }
}
