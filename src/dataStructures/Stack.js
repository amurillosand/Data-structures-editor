import { BLOCK_WITH_VERTICAL_SPACE_HEIGHT } from "../utils/Utils";
import { Vector } from "./Vector";
import Rectangle from "../drawableComponents/Rectangle";
import EmptyDataStructure from "../drawableComponents/EmptyDataStructure";

export class Stack extends Vector {
  constructor(top, name = "Stack") {
    super(top, name);
  }

  updateHeight() {
    this.height = Math.max(1, this.data.length) * BLOCK_WITH_VERTICAL_SPACE_HEIGHT;
  }

  push(value) {
    this.pushBack(value);
    this.updateHeight();
  }

  pop() {
    this.popBack();
    this.updateHeight();
  }

  get draw() {
    if (this.empty()) {
      return (
        <EmptyDataStructure
          x={this.left}
          y={this.top}
        />
      );
    }

    return this.data.map((element, index) => {
      return (
        <Rectangle
          x={this.left}
          y={this.top + (this.data.length - 1 - index) * BLOCK_WITH_VERTICAL_SPACE_HEIGHT}
          value={element.value}
          color={element.color}
          filled={true}
        />
      )
    });
  }
}