export interface GraphResponse {
    nodes: Node[];
    edges: Edge[];
}


export interface Node {
    id: any;
    left_coordinate: number;
    top_coordinate: number;
  }
 
  export interface Edge {
    id: any;
    source_node_id: any;
    version: Date;
    target_node_id: any;
  }
