export function length(p) {
  return Math.sqrt(p.x * p.x + p.y * p.y);
}

export function dif(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function sum(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function mul(a, k) {
  return { x: a.x * k, y: a.y * k };
}

export function unit(p) {
  return { x: p.x / length(p), y: p.y / length(p) };
}

export function perp(p) {
  return { x: -p.y, y: p.x };
}

export function rotate(p, angle) {
  return {
    x: p.x * Math.cos(angle) - p.y * Math.sin(angle),
    y: p.x * Math.sin(angle) + p.y * Math.cos(angle)
  };
}

export function projectionOnCircle(c, r, p) {
  return sum(c, mul(unit(dif(p, c)), r));
}

// Pt projection(Pt p) {
//   return o + (p - o).unit() * r;
// }