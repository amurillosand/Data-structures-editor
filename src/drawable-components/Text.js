import React from "react"
import { BLACK } from "../utils/Utils"

export default function Text({ x, y, text, fontSize = 18, color = BLACK, textAnchor = "start" }) {
  return (
    <text
      fill={color}
      x={x}
      y={y}
      fontSize={fontSize}
      textAnchor={textAnchor}
      alignmentBaseline="left"
      fontFamily="Helvetica Neue" >
      {text}
    </text>
  );
}