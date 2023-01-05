import React from "react"
import { BLOCK_HEIGHT } from "../utils/Utils";

export default function EmptyDataStructure({ x, y }) {
  return (
    <rect
      x={x}
      y={y}
      rx={5}
      width={BLOCK_HEIGHT}
      height={BLOCK_HEIGHT}
      fill="transparent"
      stroke="black"
      strokeDasharray="5 5"
      strokeWidth={2}
    />
  );
}