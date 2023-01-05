import Text from "../drawable-components/Text";
import { DataStructuresIdentifier } from "../utils/DataStructuresIdentifier";
import { BLOCK_HEIGHT, BLOCK_WITH_VERTICAL_SPACE, getWidthFromText, SPACE } from "../utils/Utils";

const FONT_SIZE = 12;

export class STLIndices {
  constructor(type, dataStructure) {
    this.type = type;
    this.dataStructure = dataStructure;
  }

  getWidthSum(currentIndex, array) {
    let xSum = this.dataStructure.left;
    for (let index = 0; index < currentIndex; index++) {
      xSum += getWidthFromText(array[index]) + SPACE;
    }
    let currentWidth = getWidthFromText(array[currentIndex]);
    return xSum + currentWidth / 2;
  }

  drawAbove(index, array, text) {
    return (
      <Text
        x={this.getWidthSum(index, array) + this.dataStructure.left}
        y={this.dataStructure.top - 5}
        text={text}
        fontSize={FONT_SIZE}
        textAnchor="middle" />
    );
  }

  drawLeft(index, text) {
    return (
      <Text
        x={this.dataStructure.left - SPACE}
        y={this.dataStructure.top + index * BLOCK_WITH_VERTICAL_SPACE + BLOCK_HEIGHT / 2}
        text={text}
        fontSize={FONT_SIZE}
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
      } else if (DataStructuresIdentifier.isHeap(this.type)) {
        // this relies on the graph has been drawn before
        const topNode = this.dataStructure.topNode();
        if (topNode) {
          objects = [
            <Text
              x={topNode.x}
              y={topNode.y - BLOCK_HEIGHT / 2 - SPACE}
              text="top"
              fontSize={FONT_SIZE}
              textAnchor="middle"
            />
          ];
        }
      } else if (DataStructuresIdentifier.isSet(this.type) ||
        DataStructuresIdentifier.isMap(this.type)) {
        const beginNode = this.dataStructure.begin();
        const rbeginNode = this.dataStructure.rbegin();

        if (this.dataStructure.asArray) {
          const array = this.dataStructure.data.map(element => element.value);
          this.dataStructure.data.forEach((element, index) => {
            objects.push(this.drawAbove(index, array, element.key));
          });
        } else {
          if (this.dataStructure.size() === 1) {
            objects = [
              <Text
                x={beginNode.x}
                y={beginNode.y - BLOCK_HEIGHT / 2 - SPACE}
                text="begin/rbegin"
                fontSize={FONT_SIZE}
                textAnchor="middle"
              />,
            ];
          } else {
            objects = [
              <Text
                x={beginNode.x}
                y={beginNode.y - BLOCK_HEIGHT / 2 - SPACE}
                text="begin"
                fontSize={FONT_SIZE}
                textAnchor="middle"
              />,
              <Text
                x={rbeginNode.x}
                y={rbeginNode.y - BLOCK_HEIGHT / 2 - SPACE}
                text="rbegin"
                fontSize={FONT_SIZE}
                textAnchor="middle"
              />
            ];
          }
        }
      } else if (DataStructuresIdentifier.isQueue(this.type) ||
        DataStructuresIdentifier.isDeque(this.type)) {
        const array = this.dataStructure.data.map(element => element.value);
        if (this.dataStructure.size() === 1) {
          objects = [this.drawAbove(0, array, "front/back")];
        } else {
          objects = [
            this.drawAbove(0, array, "front"),
            this.drawAbove(this.dataStructure.size() - 1, array, "back"),
          ];
        }
      }
    }
    return objects;
  }
}