import React from "react"
import { NaturalCurve } from "react-svg-curve"
import { length, dif, sum, mul, divide, unit, perp, rotate, projectionOnCircle } from "../algorithms/Geometry";

export function Edge({ rank, from, to, weight, color, directed, dashedLine }) {
  const radius = 25;

  let bothEndpoints = (from !== undefined && to !== undefined);
  let midPoint = { x: 0, y: 0 };
  let fromOnCircle = { x: 0, y: 0 };
  let toOnCircle = { x: 0, y: 0 };

  if (bothEndpoints) {
    let half = divide(sum(from, to), 2);
    let dirHalfPerp = unit(perp(dif(from, half)))
    midPoint = sum(half, mul(dirHalfPerp, -40 * rank));

    fromOnCircle = projectionOnCircle(from, radius, midPoint);
    toOnCircle = projectionOnCircle(to, radius, midPoint);
  }

  function getArrow() {
    let dir = unit(dif(midPoint, toOnCircle));

    // let p = sum(toOnCircle, mul(dir, radius));
    let start = toOnCircle;
    let end = sum(toOnCircle, mul(dir, 10));
    let perpQ = unit(perp(dif(start, end)));
    let perp1 = sum(end, mul(perpQ, 5));
    let perp2 = sum(end, mul(perpQ, -5));

    let str =
      " M " + start.x + "," + start.y +
      " " + perp1.x + ", " + perp1.y +
      " " + perp2.x + " " + perp2.y + " z ";
    // console.log(str);

    return str;
  }

  const boldEdge = (color === "black" ? 1.5 : 3);
  const dash = dashedLine ? 5 : 0;

  return (
    <g>
      {
        bothEndpoints &&
        <NaturalCurve
          data={[
            [fromOnCircle.x, fromOnCircle.y],
            [midPoint.x, midPoint.y],
            [toOnCircle.x, toOnCircle.y],
          ]}
          stroke={color}
          strokeWidth={boldEdge}
          strokeDasharray={dash}
          showPoints={false} />
      }

      {
        (bothEndpoints && directed) &&
        <path
          d={getArrow()}
          fill={color}
          stroke={color} />
      }

      {
        (bothEndpoints && weight) &&
        <text
          x={midPoint.x + 10}
          y={midPoint.y + 10}
          fill="black" >
          {weight}
        </text>
      }
    </g>
  );
}

export function Loop({ from, to, weight, color, directed }) {
  let bothEndpoints = (from !== undefined && to !== undefined);

  let textPos = { x: 0, y: 0 };
  if (bothEndpoints) {
    textPos.x = (from.x + to.x) / 2;
    textPos.y = (from.y + to.y) / 2;
  }

  const boldEdge = (color === "black" ? 1.5 : 3);
  const dx = 0;
  const dy = -35;

  function getArrow() {
    let loopOutside = {
      x: from.x + 20,
      y: from.y + dy
    };

    let dir = unit(dif(loopOutside, from));

    let p = {
      x: loopOutside.x - 5.5,
      y: loopOutside.y + 13.5
    };
    let q = sum(p, mul(dir, 8));

    let perpQ = unit(perp(dif(p, q)));
    let perp1 = sum(q, mul(perpQ, 5));
    let perp2 = sum(q, mul(perpQ, -5));

    let str =
      " M " + p.x + "," + p.y +
      " " + perp1.x + ", " + perp1.y +
      " " + perp2.x + " " + perp2.y + " z ";
    // console.log(str);

    return str;
  }

  console.log(from.x, from.y);

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

      {
        (bothEndpoints && directed) &&
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