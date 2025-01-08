export class  DraggableItem {
    id: number;      
    type: string;       
    position?: { x: number; y: number }; 
    size?: { width: number; height: number }; 
    content?: string;  
    
    constructor(id: number, type: string, position?: { x: number; y: number }, size?:{width: number; height: number}, content?: string ) {
        this.id = id;
        this.type = type;
        this.position = position;
        this.size = size;
        this.content = this.content;
      }
}
