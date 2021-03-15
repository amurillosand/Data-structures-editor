import React from "react"
import { length, dif, sum, mul, unit, perp } from "./Geometry";

export function Edge(props) {
  const { from, to, weight, color, directed } = props;

  var bothEndpoints = (from !== undefined && to !== undefined);

  var textPos = { x: 0, y: 0 };
  if (bothEndpoints) {
    textPos.x = (from.x + to.x) / 2;
    textPos.y = (from.y + to.y) / 2;
  }

  function getArrow() {
    var dir = unit(dif(from, to));

    var r = 25;

    var p = sum(to, mul(dir, r));
    var q = sum(to, mul(dir, r + 8));
    var perpQ = unit(perp(dif(p, q)));
    var perp1 = sum(q, mul(perpQ, 5));
    var perp2 = sum(q, mul(perpQ, -5));

    var str =
      " M " + p.x + "," + p.y +
      " " + perp1.x + ", " + perp1.y +
      " " + perp2.x + " " + perp2.y + " z ";
    // console.log(str);

    return str;
  }

  const boldEdge = (color === "black" ? 1.5 : 3);

  return (
    <g>
      {
        bothEndpoints &&
        <line
          x1={from.x} y1={from.y}
          x2={to.x} y2={to.y}
          stroke={color}
          strokeWidth={boldEdge} />
      }

      { (bothEndpoints && directed) &&
        <path
          d={getArrow()}
          fill={color}
          stroke={color} />
      }

      {
        (bothEndpoints && weight) &&
        <text
          x={textPos.x + 10}
          y={textPos.y + 10}
          fill="black" >
          {weight}
        </text>
      }
    </g>
  );
}

export function Loop(props) {
  const { from, to, weight, color, directed } = props;

  var bothEndpoints = (from !== undefined && to !== undefined);

  var textPos = { x: 0, y: 0 };
  if (bothEndpoints) {
    textPos.x = (from.x + to.x) / 2;
    textPos.y = (from.y + to.y) / 2;
  }

  const boldEdge = (color === "black" ? 1.5 : 3);
  const dx = 0;
  const dy = -35;

  function getArrow() {
    var r = 0;
    
    // Calculate this correctly!!!!
    // Circle-circle intersection
    var a = sum(from, {x: dx, y: -dy});
    var p = sum(a, {x: 20, y: 0});

    var dir = unit(dif(mul(p, 1.5), p));

    var q = sum(p, mul(dir, r + 8));

    var perpQ = unit(perp(dif(p, q)));
    var perp1 = sum(q, mul(perpQ, 5));
    var perp2 = sum(q, mul(perpQ, -5));

    var str =
      " M " + p.x + "," + p.y +
      " " + perp1.x + ", " + perp1.y +
      " " + perp2.x + " " + perp2.y + " z ";
    // console.log(str);

    return str;
  }

  return (
    <g>
      {
        bothEndpoints &&
        <circle
          cx={from.x + dx}
          cy={from.y + dy}
          r={20}
          fill="none"
          stroke={color}
          strokeWidth={boldEdge}
        />
      }

      { (bothEndpoints && directed) &&
        <path
          d={getArrow()}
          fill={color}
          stroke={color} />
      }

      {
        (bothEndpoints && weight) &&
        <text
          x={textPos.x + dx}
          y={textPos.y + 1.8 * dy}
          fill="black" >
          {weight}
        </text>
      }
    </g>
  );
}