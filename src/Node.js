import React from "react";
import {isLight, pickTextColor, lightenColor} from "./Stuff"

class Node extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      dragging: false,
      offset: {}
    };
  }

  handlePointerDown(e) {
    const bbox = e.target.getBoundingClientRect();
    const deltaX = e.clientX - bbox.left;
    const deltaY = e.clientY - bbox.top;
    e.target.setPointerCapture(e.pointerId);

    this.setState({
      dragging: true,
      offset: {deltaX, deltaY}
    });
  }

  handlePointerMove(e) {
    const bbox = e.target.getBoundingClientRect();
    const deltaX = e.clientX - bbox.left;
    const deltaY = e.clientY - bbox.top;

    this.setState((last) => {
      if (!last.dragging)
        return {};
    
      const nx = last.x - (last.offset.deltaX - deltaX);
      const ny = last.y - (last.offset.deltaY - deltaY);

      this.props.updatePosition(this.props.text, nx, ny);

      return {
        x: nx,
        y: ny
      };
    });
  }

  handlePointerUp(e) {
    this.setState({dragging: false});
  }

  render() {
    var nodeColor = lightenColor(this.props.color, 40);
    var textColor = "black";
    
    if (this.props.color === "transparent") {
      nodeColor = this.props.color;
      textColor = "black";
    } else {
      if (isLight(nodeColor)) {
        // make this a little bit darker
        nodeColor = lightenColor(this.props.color, 5);
      } else {
        // keep it light
        textColor = pickTextColor(nodeColor);
      }
    }

    return (
      <g>
        <circle
          cx={this.state.x}
          cy={this.state.y}
          r={25}
          onPointerDown={this.handlePointerDown.bind(this)}
          onPointerUp={this.handlePointerUp.bind(this)}
          onPointerMove={this.handlePointerMove.bind(this)}
          fill={nodeColor}
          stroke="black" />

        <text  
          fill={textColor}
          x={this.state.x} 
          y={this.state.y} 
          fontSize={15} 
          textAnchor="middle"
          alignmentBaseline="central"
          fontFamily="Helvetica Neue" >
            {this.props.text}
        </text>
      </g>
    );
  }
}

export default Node;