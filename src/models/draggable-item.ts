export interface DraggableItem {
    id: string;      
    type: string;       
    position: { x: number; y: number }; 
    size: { width: number; height: number }; 
    content: string;    
}
