import React from "react";
import { pickTextColor, getWidthFromText, BLOCK_HEIGHT } from "../utils/Utils"

export default function Rectangle({ x, y, value, color, filled }) {
  const textColor = pickTextColor(color);
  const width = getWidthFromText(value);
  const height = BLOCK_HEIGHT;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={5}
        fill={filled ? color : "transparent"}
      />

      <text
        fill={textColor}
        x={x + width / 2}
        y={y + height / 2}
        fontSize={18}
        textAnchor="middle"
        alignmentBaseline="central"
        fontFamily="Helvetica Neue" >
        {value}
      </text>
    </g>
  );
} 
