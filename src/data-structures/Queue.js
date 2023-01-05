import { Vector } from "./Vector";

export class Queue extends Vector {
  constructor(top, name = "Queue") {
    super(top, name);
  }

  push(value) {
    this.pushBack(value);
  }

  pop() {
    this.popFront();
  }
}