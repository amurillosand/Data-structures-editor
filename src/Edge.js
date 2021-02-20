import React from "react"

export function Edge(props) {
  console.log("Create edge", props)
  if (props.to === undefined) {
    return <> </>
  } else {
    return (
      <line 
        x1={props.from.x} y1={props.from.y} 
        x2={props.to.x} y2={props.to.y} 
        stroke="black" />
    );
  }
}