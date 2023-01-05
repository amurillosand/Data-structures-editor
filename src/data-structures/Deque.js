import { Vector, Sides } from "./Vector";

export class Deque extends Vector {
  constructor(top, name = "Deque") {
    super(top, name);
    this.side = Sides.BACK;
  }

  push(value) {
    if (this.side === Sides.BACK) {
      this.pushBack(value);
    } else {
      this.pushFront(value);
    }
  }
}