import React from "react"
import { NaturalCurve } from "react-svg-curve"
import { length, dif, sum, mul, divide, unit, perp, rotate, projectionOnCircle } from "./Geometry";

export function Edge(props) {
  const { delta, from, to, weight, color, directed } = props;

  let bothEndpoints = (from !== undefined && to !== undefined);

  let fromProjection = { x: 0, y: 0 };
  let toProjection = { x: 0, y: 0 };
  let midPoint = { x: 0, y: 0 };

  if (bothEndpoints) {
    fromProjection = projectionOnCircle(from, 25, to);
    toProjection = projectionOnCircle(to, 25, from);
    // fromProjection = from;
    // toProjection = to;

    let half = divide(sum(fromProjection, toProjection), 2);
    let dirHalfPerp = unit(perp(dif(fromProjection, half)))
    midPoint = sum(half, mul(dirHalfPerp, delta));
  }

  function getArrow() {
    let dir = unit(dif(from, to));

    let r = 25;

    let p = sum(to, mul(dir, r));
    let q = sum(to, mul(dir, r + 8));
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

  const boldEdge = (color === "black" ? 1.5 : 3);

  return (
    <g>
      {
        bothEndpoints &&
        <NaturalCurve
          data={[
            [fromProjection.x, fromProjection.y],
            [midPoint.x, midPoint.y],
            [toProjection.x, toProjection.y],
          ]}
          stroke={color}
          strokeWidth={boldEdge}
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

export function Loop(props) {
  const { from, to, weight, color, directed } = props;

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