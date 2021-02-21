import React from "react"

export function Edge(props) {
  console.log("Create edge", props)

  var textPos = {x: 0, y: 0};
  if (props.from !== undefined && props.to !== undefined) {
    textPos.x = (props.from.x + props.to.x) / 2;
    textPos.y = (props.from.y + props.to.y) / 2;
  }

  return (
    <g>
      {
        (props.from !== undefined && props.to !== undefined) &&
        <line 
          x1={props.from.x} y1={props.from.y} 
          x2={props.to.x} y2={props.to.y} 
          stroke="black" />
      }

      {
        (props.from !== undefined && props.to !== undefined && props.text) &&
        <text 
          x={textPos.x + 20} 
          y={textPos.y + 20} 
          fill="black">
          {props.text}
        </text>
      }
    </g> 
  );
}