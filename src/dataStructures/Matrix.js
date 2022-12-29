import EmptyDataStructure from "../drawableComponents/EmptyDataStructure";
import { DEFAULT_NODE_COLOR, BLOCK_WITH_VERTICAL_SPACE_HEIGHT } from "../utils/Utils";
import { Vector } from "./Vector";

export class Matrix {
  constructor(top, name = "Matrix") {
    this.currentColor = DEFAULT_NODE_COLOR;
    this.data = [];
    this.left = 0;
    this.top = top;
    this.height = 0;
    this.width = 0;
    this.name = name;
  }

  addRow() {
    this.height += BLOCK_WITH_VERTICAL_SPACE_HEIGHT;
    this.data.push([]);
  }

  updateLastElementColor(color) {
    if (this.data.length > 0) {
      if (this.data.at(-1).length > 0) {
        this.data.at(-1).at(-1).color = color;
      }
    }
  }

  lastRowPushBack(value) {
    this.data.at(-1).push({
      value: value,
      color: this.currentColor,
    })
  }

  empty() {
    return this.data.length === 0;
  }

  rows() {
    return this.data.length;
  }

  columns() {
    return this.rows() > 0 ? this.data[0].length : 0;
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

    let objects = [];
    this.data.forEach((row, rowIndex) => {
      const rowVector = new Vector(rowIndex * BLOCK_WITH_VERTICAL_SPACE_HEIGHT + this.top);
      row.forEach((element, columnIndex) => {
        rowVector.pushBack(element.value, element.color);
      });
      objects = objects.concat(rowVector.draw);
    });

    return objects;
  }
}