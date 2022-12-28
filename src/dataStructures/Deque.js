import { Vector, Sides } from "./Vector";

export class Deque extends Vector {
  constructor(top, name = "Deque") {
    super(top);
    this.side = Sides.BACK;
    this.name = name;
  }

  push(value) {
    if (this.side === Sides.BACK) {
      this.pushBack(value);
    } else {
      this.pushFront(value);
    }
  }
}