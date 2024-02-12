import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { GraphResponse } from './data';
import { Node, Edge } from './data';
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private nodesUrl = 'http://localhost:3301/nodes';
  private edgesUrl = 'http://localhost:3301/edges';
  private graphUrl = 'http://localhost:3301/graph';
  private updateUrl = 'http://localhost:3301/update';

  constructor(private http: HttpClient) { }

  getGraphData(): Observable<GraphResponse> {
    return this.http.get<GraphResponse>(this.graphUrl);
  }


  postNodesData(nodes: any): void {
    console.log("Hiiiii nodes");
     this.http.post<any>(this.nodesUrl, nodes).subscribe(
      (response) => {
        console.log("Response of nodes received:", response);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
     console.log("donne nodes");
  }
  postEdgesData(edges:any): void {
    console.log("Hi edges");
     this.http.post<any>(this.edgesUrl, edges).subscribe(
      (response) => {
        console.log("Response of edges received:", response);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
     console.log("donne edges");
  }

  postNodesUpdates(nodes: any):void {
    console.log("Hiiiii update nodes");
    this.http.post<any>(this.updateUrl, nodes).subscribe(
     (response) => {
       console.log("Response of updates of nodes received:", response);
     },
     (error) => {
       console.error("Error:", error);
     }
   );
    console.log("donne updating nodes");
  }
}
