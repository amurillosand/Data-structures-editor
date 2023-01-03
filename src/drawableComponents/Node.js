import React from "react";
import { isLight, pickTextColor, lightenColor, getWidthFromText, BLOCK_HEIGHT } from "../utils/Utils"

export class Node extends React.Component {
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
      offset: { deltaX, deltaY }
    });
  }

  handlePointerMove(e) {
    const bbox = e.target.getBoundingClientRect();
    const deltaX = e.clientX - bbox.left;
    const deltaY = e.clientY - bbox.top;

    this.setState((prev) => {
      if (!prev.dragging)
        return {};

      const nx = prev.x - (prev.offset.deltaX - deltaX);
      const ny = prev.y - (prev.offset.deltaY - deltaY);

      this.props.updatePosition(this.props.label, nx, ny);

      return {
        x: nx,
        y: ny
      };
    });
  }

  handlePointerUp(e) {
    this.setState({ dragging: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        x: this.props.x,
        y: this.props.y
      });
    }
  }

  render() {
    var nodeColor = this.props.color;
    var textColor = "black";

    if (this.props.color !== "transparent") {
      if (isLight(nodeColor)) {
        // make this a little bit darker
        nodeColor = lightenColor(this.props.color, 15);
      } else {
        // keep it light
        textColor = pickTextColor(nodeColor);
      }
    }

    const width = getWidthFromText(this.props.label);
    let drawCircle = true;
    if (width > 100) {
      drawCircle = false;
    }

    return (
      <g>
        {
          drawCircle ?
            <circle
              cx={this.state.x}
              cy={this.state.y}
              r={25}
              // onPointerDown={this.handlePointerDown.bind(this)}
              // onPointerUp={this.handlePointerUp.bind(this)}
              // onPointerMove={this.handlePointerMove.bind(this)}
              // stroke="black" 
              fill={nodeColor}
            />
            :
            <rect
              x={this.state.x - width / 2}
              y={this.state.y - BLOCK_HEIGHT / 2}
              fill={nodeColor}
              width={width}
              height={BLOCK_HEIGHT}
              rx="25"
            />
        }

        <text
          fill={textColor}
          x={this.state.x}
          y={this.state.y}
          fontSize={15}
          textAnchor="middle"
          alignmentBaseline="central"
          fontFamily="Helvetica Neue" >
          {this.props.label}
        </text>
      </g>
    );
  }
}