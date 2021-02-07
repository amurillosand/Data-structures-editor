import React, { Component } from "react"
import Circle from "./Circle";

export function getNode(node) {
  return <Circle 
            x={node.x} y={node.y} r={node.r} 
            color={node.color} 
            text={node.text} />;
}

export function getEdge(u, v) {
  return <line x1={u.x} y1={u.y} x2={v.x} y2={v.y} stroke="black" />
}
