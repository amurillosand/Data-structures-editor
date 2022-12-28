import React from "react"
import { BLACK } from "../utils/Utils"

export default function Text({ x, y, text, color = BLACK }) {
  return (
    <text
      fill={color}
      x={x}
      y={y}
      fontSize={18}
      textAnchor="left"
      alignmentBaseline="left"
      fontFamily="Helvetica Neue" >
      {text}
    </text>
  );
}