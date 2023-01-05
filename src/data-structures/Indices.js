import Text from "../drawable-components/Text";
import { DataStructuresIdentifier } from "../utils/DataStructuresIdentifier";
import { BLOCK_HEIGHT, BLOCK_WITH_VERTICAL_SPACE, getWidthFromText, SPACE } from "../utils/Utils";

export class Indices {
  constructor(type, dataStructure) {
    this.type = type;
    this.dataStructure = dataStructure;
  }

  drawHorizontalIndices(row) {
    let xSum = this.dataStructure.left;
    let lastWidth = 0;
    const objects = [];
    row.forEach((element, index) => {
      if (index > 0) {
        xSum += lastWidth + SPACE;
      }
      lastWidth = getWidthFromText(element.value);
      objects.push(
        <Text
          x={xSum + lastWidth / 2 + this.dataStructure.left}
          y={this.dataStructure.top - 5}
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
          x={this.dataStructure.left - SPACE}
          y={this.dataStructure.top + index * BLOCK_WITH_VERTICAL_SPACE + BLOCK_HEIGHT / 2}
          text={index}
          fontSize={12}
          textAnchor="end"
        />
      );
    }
    return objects;
  }

  get draw() {
    let objects = [];
    if (!this.dataStructure.empty()) {
      if (DataStructuresIdentifier.isVector(this.type)) {
        objects = objects.concat(this.drawHorizontalIndices(this.dataStructure.data));
      } else {
        objects = objects.concat(this.drawHorizontalIndices(this.dataStructure.data[0]));
        objects = objects.concat(this.drawVerticallIndices(this.dataStructure.data.length));
      }
    }
    return objects;
  }
}