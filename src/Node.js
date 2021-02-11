import React from "react";

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
    // console.clear();
    console.log("Node " + this.props.text, this.state);
    // TODO: try to change the color of the letters according to the color
    // lightColor -> darkFont, and viceversa

    return (
      <g>
        <circle
          cx={this.state.x}
          cy={this.state.y}
          r={this.props.r}
          onPointerDown={this.handlePointerDown.bind(this)}
          onPointerUp={this.handlePointerUp.bind(this)}
          onPointerMove={this.handlePointerMove.bind(this)}
          fill={this.props.color}
          stroke="black" />

        <text  
          fill="black"
          x={this.state.x} 
          y={this.state.y} 
          fontSize={14} 
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