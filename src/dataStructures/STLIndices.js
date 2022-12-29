import Text from "../drawableComponents/Text";
import { DataStructuresIdentifier } from "../utils/DataStructuresIdentifier";
import { BLOCK_HEIGHT, BLOCK_WITH_VERTICAL_SPACE_HEIGHT, getWidthFromText, SPACE } from "../utils/Utils";

export class STLIndices {
  constructor(type, dataStructure) {
    this.type = type;
    this.dataStructure = dataStructure;
  }

  drawAbove(currentIndex, text) {
    let xSum = this.dataStructure.left;
    for (let index = 0; index < currentIndex; index++) {
      xSum += getWidthFromText(this.dataStructure.data[index].value) + SPACE;
    }
    let currentWidth = getWidthFromText(this.dataStructure.data[currentIndex].value);

    return (
      <Text
        x={xSum + currentWidth / 2 + this.dataStructure.left}
        y={this.dataStructure.top - 5}
        text={text}
        fontSize={12}
        textAnchor="middle" />
    );
  }

  drawLeft(index, text) {
    return (
      <Text
        x={this.dataStructure.left - SPACE}
        y={this.dataStructure.top + index * BLOCK_WITH_VERTICAL_SPACE_HEIGHT + BLOCK_HEIGHT / 2}
        text={text}
        fontSize={12}
        textAnchor="end" />
    );
  }

  get draw() {
    let objects = [];
    if (!this.dataStructure.empty()) {
      if (DataStructuresIdentifier.isStack(this.type)) {
        if (this.dataStructure.size() === 1) {
          objects = [this.drawLeft(0, "top/bottom")];
        } else {
          objects = [
            this.drawLeft(0, "top"),
            this.drawLeft(this.dataStructure.size() - 1, "bottom"),
          ];
        }
      } else {
        if (this.dataStructure.size() === 1) {
          objects = [this.drawAbove(0, "front/back")];
        } else {
          objects = [
            this.drawAbove(0, "front"),
            this.drawAbove(this.dataStructure.size() - 1, "back"),
          ];
        }
      }
    }
    return objects;
  }
}