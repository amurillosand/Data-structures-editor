import React from "react"

function length(p) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

function dif(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

function sum(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

function mul(a, k) {
  return { x: a.x * k, y: a.y * k };
}

function unit(p) {
  return { x: p.x / length(p), y: p.y / length(p) };
}

function perp(p) {
  return { x: -p.y, y: p.x };
}

export function Edge(props) {
  // console.log("Create edge", props)

  const { from, to, weight, color, directed } = props;

  var bothEndpoints = (from !== undefined && to !== undefined);

  var textPos = { x: 0, y: 0 };
  if (bothEndpoints) {
    textPos.x = (from.x + to.x) / 2;
    textPos.y = (from.y + to.y) / 2;
  }

  function getPath() {
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
          d={getPath()}
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