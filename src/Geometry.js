export function length(point) {
  return Math.sqrt(point.x * point.x + point.y * point.y);
}

export function dif(pointA, pointB) {
  return { x: pointA.x - pointB.x, y: pointA.y - pointB.y };
}

export function sum(pointA, pointB) {
  return { x: pointA.x + pointB.x, y: pointA.y + pointB.y };
}

export function mul(point, k) {
  return { x: point.x * k, y: point.y * k };
}

export function divide(point, k) {
  return { x: point.x / k, y: point.y / k };
}

export function unit(point) {
  return { x: point.x / length(point), y: point.y / length(point) };
}

export function perp(point) {
  return { x: -point.y, y: point.x };
}

export function rotate(point, angle) {
  return {
    x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
    y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
  };
}

export function projectionOnCircle(center, radius, point) {
  return sum(center, mul(unit(dif(point, center)), radius));
}
