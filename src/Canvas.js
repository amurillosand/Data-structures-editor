import React, { Component } from "react";
import {getNode, getEdge} from "./Graph";
import "./styles.css"

class Canvas extends Component {
  constructor(props) {
    super(props); 
  }

  render() {  
    console.log("Nodes", this.props.nodes);
    console.log("Edges", this.props.edges);
    
    // const edges = this.props.nodes.map((edge) => {
    //   return getEdge(edge.u, edge.v);
    // });

    const nodes = this.props.nodes.map((node) => {
      return getNode(node);
    });
    
    return (
      // <svg className="image">
      //   <line x1={50} y1={50} x2={130} y2={130} stroke="black" />
      //   <Circle x={50} y={50} r={25} color={'blue'} text={'c1'} />
      //   <Circle x={130} y={130} r={25} color={'red'} text={2} />
      // </svg>
      <svg className="image">
        {/* {edges} */}
        {nodes}
      </svg>
    );
  }  
}

export default Canvas;