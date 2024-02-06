import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { fabric } from "fabric";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';

  canvas: fabric.Canvas = new fabric.Canvas(null);
  node: HTMLButtonElement = document.createElement('button');
  edge: HTMLButtonElement = document.createElement('button');
 
  firstObject: fabric.Object | null = null;
  secondObject: fabric.Object | null = null;
  connectClicked: boolean = false;
  firstObjectSelected: boolean = false;
  
  n: number = 0;
 
  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas1');
    this.node = document.getElementById('node') as HTMLButtonElement;
    this.edge = document.getElementById('line') as HTMLButtonElement;
    }


    
  drawNode() {
    var circle = new fabric.Circle({
      radius: 40,
      opacity: 1,
      fill: '#dcd5af' ,
      stroke: '#000',
      strokeWidth: 1,
      originX: 'center', 
      originY: 'center' 
    });
    
    this.n++;
    var text = new fabric.Text('Node'+this.n,
              { fontSize: 25, 
                originX: 'center', 
                originY: 'center',
                fill : 'black' ,
              });

    var group = new fabric.Group([ circle, text ], { 
                             left: 50, top: 50
                              });
    group.on("mousedown", (event) => {
      if(this.connectClicked) {
        if(!this.firstObjectSelected) {
          this.firstObjectSelected = true;
          if(event.target)
            this.firstObject = event.target;
          console.log("firstObject ", this.firstObject);
        } else {
          if(event.target)
            this.secondObject = event.target;
          console.log("secondObject ", this.secondObject);
          this.firstObjectSelected = false;
          if(this.firstObject === null || this.secondObject === null) {
            alert("incorrect connection, please repeat the operation");
            this.connectClicked = false;
          }
        }
      }  
     
    });
    var id = "p" ;
    group.set('name', id);
    this.canvas.add(group);
    
  }

  drawEdge() {
    this.connectClicked = true;
    console.log(this.connectClicked);
    console.log(this.firstObject, this.secondObject);
    if (this.firstObject && this.secondObject) {
      if(this.firstObject.name && this.secondObject.name) {
  
       
       var firstX: any, firstY: any, secondX: any , secondY: any;
       if (this.firstObject.name.charAt(0) === "p") {
          firstX = this.firstObject.getCenterPoint().x;
          firstY = this.firstObject.getCenterPoint().y;
          firstX = firstX + 40;
        
          secondX = this.secondObject.left;
          secondY = this.secondObject.top;
          secondY = secondY + 30;
          if (firstX > secondX) {
            secondX = secondX + 90;
            firstX = firstX - 80;
          }
          this.connect(firstX, firstY, secondX, secondY);
        }
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
      },{
        x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2), 
        y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
      }, {
        x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
        y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
      },{
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
      },{
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
