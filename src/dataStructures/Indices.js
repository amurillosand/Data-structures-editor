import React from "react";
import Text from "../drawableComponents/Text";
import { DataStructuresIdentifier } from "../utils/DataStructuresIdentifier";
import { BLOCK_HEIGHT, BLOCK_WITH_VERTICAL_SPACE_HEIGHT, getWidthFromText, SPACE } from "../utils/Utils";

export class Indices {
  constructor(type, object) {
    this.type = type;
    this.object = object;
  }

  drawHorizontalIndices(row) {
    let xSum = this.object.left;
    let lastWidth = 0;
    const objects = [];
    row.forEach((element, index) => {
      if (index > 0) {
        xSum += lastWidth + SPACE;
      }
      lastWidth = getWidthFromText(element.value);
      objects.push(
        <Text
          x={xSum + lastWidth / 2 + this.object.left}
          y={this.object.top - 5}
          text={index}
          fontSize={12}
          textAnchor="middle"
        />
      );
    });
    return objects;
  }

  drawVerticallIndices(columnLength) {
    const objects = [];
    for (let index = 0; index < columnLength; index++) {
      objects.push(
        <Text
          x={this.object.left - 10}
          y={this.object.top + index * BLOCK_WITH_VERTICAL_SPACE_HEIGHT + BLOCK_HEIGHT / 2}
          text={index}
          fontSize={12}
          textAnchor="middle"
        />
      );
    }
    return objects;
  }

  get draw() {
    let objects = [];
    if (!this.object.empty()) {
      if (DataStructuresIdentifier.isVector(this.type)) {
        objects = objects.concat(this.drawHorizontalIndices(this.object.data));
      } else {
        objects = objects.concat(this.drawHorizontalIndices(this.object.data[0]));
        objects = objects.concat(this.drawVerticallIndices(this.object.data.length));
      }
    }
    return objects;
  }
}