import React, { Component } from "react";
import {addNode, addEdge} from "./Graph";
import Circle from "./Circle";
import "./styles.css"

class Canvas extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    console.log("Amount of nodes: " + this.props.nodes.length)


    return (
      // <svg className="image">
      //   <line x1={50} y1={50} x2={130} y2={130} stroke="black" />
      //   <Circle x={50} y={50} r={25} color={'blue'} text={'c1'} />
      //   <Circle x={130} y={130} r={25} color={'red'} text={2} />
      // </svg>

      <svg className="image">
        {this.props.nodes}
      </svg>
    );
  }  
}

export default Canvas;