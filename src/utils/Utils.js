export const DEFAULT_COLOR = "#c9a9ff";
export const BLACK = "black";

export const BLOCK_HEIGHT = 50;
export const TEXT_SPACE = 30;
export const SPACE = 10;
export const BLOCK_WITH_VERTICAL_SPACE = BLOCK_HEIGHT + SPACE;
export const VERTICAL_DISTANCE = 90;
export const HORIZONTAL_DISTANCE = 120;

export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export function toNumber(number) {
  return isNumeric(number) ? Number(number) : number;
}

export function isNumeric(num) {
  return !isNaN(num);
}

export function isColor(x) {
  x = x.toLowerCase();
  if (x === "reset") {
    return true;
  }
  let s = new Option().style
  s.color = x
  let test1 = s.color === x
  let test2 = /^#[0-9A-F]{6}$/i.test(x)
  return (test1 === true || test2 === true)
}

export function isDash(x) {
  x = x.toLowerCase();
  return x === "dash";
}

export function isSpace(c) {
  return (c === ' ') || (c === '\t');
}

export function divideByTokens(str) {
  let result = [];
  let last = "";
  for (let i in str) {
    let c = str[i];
    if (isSpace(c)) {
      if (last !== "") {
        result.push(last.trim());
      }
      last = "";
    } else {
      last += c;
    }
  }
  if (last !== "") {
    result.push(last.trim());
  }
  return result;
}

export function isLight(color) {
  let cur = color.charAt(0) === '#' ? color.substring(1, 7) : color;
  let r = parseInt(cur.substring(0, 2), 16); // hexToR
  let g = parseInt(cur.substring(2, 4), 16); // hexToG
  let b = parseInt(cur.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186);
}

export function pickTextColor(color) {
  return isLight(color) ? "black" : "white";
}

function getRGB(rgb) {
  let el = document.createElement("div");
  el.style["background-color"] = rgb;
  document.body.appendChild(el);

  let style = window.getComputedStyle(el);
  let color = style["backgroundColor"];
  document.body.removeChild(el);

  return color;
}

function parseColor(color) {
  let arr = [];
  color.replace(/[\d+\.]+/g, function (v) {
    arr.push(parseFloat(v));
  });
  return "#" + arr.slice(0, 3).map(toHex).join("");
}

function toHex(int) {
  let hex = int.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function lightenColor(col, amt) {
  if (col.charAt(0) !== '#') {
    col = parseColor(getRGB(col));
  }

  let cur = col.charAt(0) === '#' ? col.substring(1, 7) : col;

  let r = Math.max(Math.min(255, parseInt(cur.substring(0, 2), 16) + amt), 0).toString(16)
  let g = Math.max(Math.min(255, parseInt(cur.substring(2, 4), 16) + amt), 0).toString(16)
  let b = Math.max(Math.min(255, parseInt(cur.substring(4, 6), 16) + amt), 0).toString(16)

  const rr = (r.length < 2 ? '0' : '') + r
  const gg = (g.length < 2 ? '0' : '') + g
  const bb = (b.length < 2 ? '0' : '') + b
  return `#${rr}${gg}${bb}`
}

export function getWidthFromText(text) {
  if (isNumeric(text)) {
    text = text.toString();
  }
  return Math.max(BLOCK_HEIGHT, text.length * 12);
}

export function isSmaller(a, b) {
  if (isNumeric(a)) {
    if (isNumeric(b)) {
      return a - b;
    } else {
      return -1;
    }
  } else {
    if (isNumeric(b)) {
      return +1;
    } else {
      if (a === b) {
        return 0;
      }
      return a < b ? -1 : +1;
    }
  }
}

export function toLowerCase(line) {
  return line.toLowerCase();
}

export function getColor(color) {
  if (toLowerCase(color) === "reset") {
    return DEFAULT_COLOR;
  }
  return color;
}