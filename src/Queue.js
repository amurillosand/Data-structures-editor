export function Queue() {
  this.elements = [];
}

Queue.prototype.push = function (e) {
  this.elements.push(e);
};

Queue.prototype.pop = function () {
  return this.elements.shift();
};

Queue.prototype.empty = function () {
  return this.elements.length == 0;
};

Queue.prototype.front = function () {
  return !this.empty() ? this.elements[0] : undefined;
};

Queue.prototype.length = function () {
  return this.elements.length;
}