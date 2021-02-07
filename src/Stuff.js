export function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export function isNumeric(num) {
  return !isNaN(num)
}

export function isColor(x){
  let s = new Option().style
  s.color = x
  let test1 = s.color == x
  let test2 = /^#[0-9A-F]{6}$/i.test(x)
  return (test1 == true || test2 == true)
}

export function isSpace(c) {
  return (c == ' ') || (c == '\t');
}

export function divideByTokens(str) {
  var result = [];
  var last = "";
  for (var i in str) {
    var c = str[i];
    if (isSpace(c)) {
      if (last != "") {
        result.push(last);
      }
      last = "";
    } else {
      last += c;
    }
  }
  if (last != "") {
    result.push(last);
  }
  return result;
}