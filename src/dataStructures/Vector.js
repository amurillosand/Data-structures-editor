import { DEFAULT_NODE_COLOR, BLOCK_HEIGHT, SPACE, getWidthFromText } from "../utils/Utils";
import Rectangle from "../drawableComponents/Rectangle";
import EmptyDataStructure from "../drawableComponents/EmptyDataStructure";

export const Sides = {
  BACK: -1,
  FRONT: 0,
};

export class Vector {
  constructor(top, name = "Vector") {
    this.currentColor = DEFAULT_NODE_COLOR;
    this.data = [];
    this.left = 0;
    this.top = top;
    this.height = BLOCK_HEIGHT;
    this.width = 0;
    this.lastSideUsed = Sides.BACK;
    this.name = name;
  }

  updateLastElementColor(color) {
    if (this.data.length > 0) {
      this.data.at(this.lastSideUsed).color = color;
    }
  }

  updateWidth() {
    this.width = this.data.reduce((partialSum, element) => partialSum + getWidthFromText(element.value) + SPACE, 0);
  }

  pushBack(value, color = null) {
    this.lastSideUsed = Sides.BACK;
    this.data.push({
      value: value,
      color: color ?? this.currentColor,
    })
    this.updateWidth();
  }

  pushFront(value, color = null) {
    this.lastSideUsed = Sides.FRONT;
    this.data.unshift({
      value: value,
      color: color ?? this.currentColor,
    });
    this.updateWidth();
  }

  popBack() {
    this.data.pop();
    this.updateWidth();
  }

  popFront() {
    this.data.shift();
    this.updateWidth();
  }

  empty() {
    return this.size() === 0;
  }

  size() {
    return this.data.length;
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

    let xSum = this.left;
    let lastWidth = 0;
    return this.data.map((element, index) => {
      if (index > 0) {
        xSum += lastWidth + SPACE;
      }
      lastWidth = getWidthFromText(element.value);
      return (
        <Rectangle
          x={xSum + this.left}
          y={this.top}
          value={element.value}
          color={element.color}
          filled={true}
        />
      )
    });
  }
}