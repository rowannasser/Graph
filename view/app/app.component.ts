import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GraphService } from './graph.service';
import { fabric } from "fabric";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(private graphService: GraphService) { }

  index: any;
  graphData: any;
  nodesData: any;
  edgesData: any;

  title = 'project';

  canvas: fabric.Canvas = new fabric.Canvas(null);
  node: HTMLButtonElement = document.createElement('button');
  edge: HTMLButtonElement = document.createElement('button');

  firstObject: fabric.Object | null = null;
  secondObject: fabric.Object | null = null;
  connectClicked: boolean = false;
  firstObjectSelected: boolean = false;

  x: any = 0;
  y: any = 0;
  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas1');
    this.node = document.getElementById('node') as HTMLButtonElement;
    this.edge = document.getElementById('line') as HTMLButtonElement;

    this.getGraphData();
  }
 

  getGraphData(): void {
    this.graphService.getGraphData().subscribe(
      (data) => {
        this.graphData = data;

        this.nodesData = this.graphData.nodes;
        this.nodesData.forEach((node: { left_coordinate: number; top_coordinate: number; _id: any;}) => {
          console.log("ddddddddddd:   "+node._id);
          this.drawNode(node.left_coordinate, node.top_coordinate, node._id);
        });

        this.edgesData = this.graphData.edges;
        this.edgesData.forEach((node1: { source_node_id: any; target_node_id: any; }) => {
          this.addEdge(node1.source_node_id, node1.target_node_id);
          console.log("yarabbb  "+node1.target_node_id);
        });
        // this.initializeID();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  initializeID() {
    this.index = Math.max(...this.nodesData.map((node: { id: any; }) => node.id), 0) + 1 || 1;
  }
  incrementId() {
    this.index++;
  }

  addNodeToGraph(leftDim: number, topDim: number) {
    var Id;
    const jsonNodes = {
      left_coordinate: leftDim,
      top_coordinate: topDim
    };
    this.graphService.postNodesData(jsonNodes).subscribe(
      (response) => {
        console.log("Response of nodes received:", response);
        Id = response._id;
        console.log("idddd:   "+Id);
        this.drawNode(leftDim, topDim,Id);
      },
      (error) => {
        console.error("Error:", error);
      }
    );
   
    
    console.log("donne");
    
  }

  addEdgeToGraph(id1: any, id2: any, version: any) {
    const jsonEdges = {
      source_node_id: id1,
      version: version,
      target_node_id: id2
    }
    this.graphService.postEdgesData(jsonEdges).subscribe(
      (response) => {
        console.log("Response of nodes received:", response);
      
      },
      (error) => {
        console.error("Error:", error);
      });
  }

  drawNode(leftDim: number, topDim: number, id:any) {
    var circle = new fabric.Circle({
      radius: 40,
      opacity: 1,
      fill: '#dcd5af',
      stroke: '#000',
      strokeWidth: 1,
      originX: 'center',
      originY: 'center'
    });
    console.log("idddd innn:   "+id);
   
    var group = new fabric.Group([circle], {
      left: leftDim, top: topDim
    });
    group.on("mousedown", (event) => {
      if (this.connectClicked) {
        if (!this.firstObjectSelected) {
          this.firstObjectSelected = true;
          if (event.target)
            this.firstObject = event.target;
          console.log("firstObject ", this.firstObject);
        } else {
          if (event.target)
            this.secondObject = event.target;
          console.log("secondObject ", this.secondObject);
          this.firstObjectSelected = false;
          if (this.firstObject === null || this.secondObject === null) {
            alert("incorrect connection, please repeat the operation");
            this.connectClicked = false;
          }
        }
      }
    });
    
    group.set('name', id);
    this.canvas.add(group);
  }

  addEdge(firstID: any, secondID: any) {
    const firstNode = this.nodesData.find((node: { _id: any; }) => node._id === firstID);
    const secondNode = this.nodesData.find((node: { _id: any; }) => node._id === secondID);
    console.log("3aaaaaaaaaaaaaaaaa"+firstNode);
    var firstX: any, firstY: any, secondX: any, secondY: any;
    if (firstNode && secondNode) {
      firstX = firstNode.left_coordinate + 40;
      firstY = firstNode.top_coordinate + 40;
      secondX = secondNode.left_coordinate + 40;
      secondY = secondNode.top_coordinate + 40;

      this.connect(firstX, firstY, secondX, secondY);
    } else {
      console.error('One or both nodes not found.');
    }

  }

  drawEdge() {
    this.connectClicked = true;
    console.log(this.connectClicked);
    console.log(this.firstObject, this.secondObject);

    if (this.firstObject && this.secondObject) {
      const id1 = this.firstObject.name;
      console.log("ahhhhhhhhh yanaaaa id1:  "+id1);
      const id2 = this.secondObject.name;
      if (id1 && id2) {
        var firstX: any, firstY: any, secondX: any, secondY: any;
       
        firstX = this.firstObject.left;
        firstY = this.firstObject.top;
        firstX = firstX + 40;
        firstY = firstY + 40;
        const jsonNodes1 = {
          id: id1,
          left_coordinate: firstX,
          top_coordinate: firstY
          
        };
        this.graphService.postNodesUpdates(jsonNodes1);
        console.log("Left: ", firstX);
        console.log("Top: ", firstY)

        secondX = this.secondObject.left;
        secondY = this.secondObject.top;
        secondY = secondY + 40;
        secondX = secondX + 40;
        const jsonNodes2 = {
          id: id2,
          left_coordinate: secondX,
          top_coordinate: secondY
        };
        this.graphService.postNodesUpdates(jsonNodes2);

        this.connect(firstX, firstY, secondX, secondY);
        this.addEdgeToGraph(id1, id2, '2024-02-07 13:00:00');
        
      }
      this.firstObject = null;
      this.secondObject = null;
      this.connectClicked = false;
    }
  }

  connect(fromx: number, fromy: number, tox: number, toy: number) {
    var angle = Math.atan2(toy - fromy, tox - fromx);
    var headlen = 10;

    tox = tox - (headlen) * Math.cos(angle);
    toy = toy - (headlen) * Math.sin(angle);

    var points = [
      {
        x: fromx,  // start point
        y: fromy
      }, {
        x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
      }, {
        x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
      }, {
        x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
        y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
      }, {
        x: tox + (headlen) * Math.cos(angle),
        y: toy + (headlen) * Math.sin(angle)
      }, {
        x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
        y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
      }, {
        x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
      }, {
        x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
      }, {
        x: fromx,
        y: fromy
      }
    ];
    var arrow = new fabric.Polyline(points, {
      fill: 'black',
      opacity: 1,
      strokeWidth: 1,
      originX: 'left',
      originY: 'top',
      selectable: false
    });
    this.canvas.add(arrow);
  }
}