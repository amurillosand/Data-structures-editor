import { BLOCK_WITH_VERTICAL_SPACE_HEIGHT } from "../utils/Utils";
import Rectangle from "../drawableComponents/Rectangle";
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