import React, { Component } from "react"
import Circle from "./Circle";

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export function getNode(u, color) {
  const x = getRandom(0, 400)
  const y = getRandom(0, 400)
  return <Circle x={x} y={y} r={25} color={color} text={u} />;
}

export function getEdge(u, v) {
  return <line x1={u.x} y1={u.y} x2={v.x} y2={v.y} stroke="black" />
}
