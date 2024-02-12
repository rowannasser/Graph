export interface GraphResponse {
    nodes: Node[];
    edges: Edge[];
}


export interface Node {
    id: number;
    left_coordinate: number;
    top_coordinate: number;
  }
 
  export interface Edge {
    id: number;
    source_node_id: number;
    version: Date;
    target_node_id: number;
  }
