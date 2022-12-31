import { isSmaller, DEFAULT_NODE_COLOR, SPACE, BLOCK_HEIGHT, BLOCK_WITH_VERTICAL_SPACE } from "../utils/Utils";
import { Graph } from "./Graph";
import { distanceY } from "../algorithms/Buchheim";
import EmptyDataStructure from "../drawableComponents/EmptyDataStructure";

export const HeapType = {
  MIN: -1,
  MAX: 1,
};

export class Heap {
  constructor(top, name = "Priority Queue") {
    this.name = name;
    this.currentColor = DEFAULT_NODE_COLOR;
    this.data = [null];

    this.left = 0;
    this.top = top;
    this.height = 0;
    this.width = 0;

    this.heapType = HeapType.MAX;

    this.lastIndex = 0;
  }

  updateLastElementColor(color) {
    // TODO: save the position of the node :p
    console.log(this.lastIndex);
    if (this.lastIndex !== 0 && this.data.length) {
      this.data.at(this.lastIndex).color = color;
    }
  }

  updateHeight() {
    if (this.data.length <= 2) {
      this.height = BLOCK_HEIGHT;
    } else {
      let treeHeight = Math.floor(Math.log2(this.data.length - 1));
      this.height = treeHeight * distanceY + BLOCK_HEIGHT;
    }
  }

  push(value, color = null) {
    this.data.push({
      value: value,
      color: color ?? this.currentColor,
    });
    this.lastIndex = this.data.length - 1;
    this.bubbleUp(this.data.length - 1);
    this.updateHeight();
  }

  pop() {
    this.swap(1, this.data.length - 1);
    this.data.pop();
    this.bubbleDown(1);
    this.updateHeight();
  }

  topNode() {
    return this.graph.nodes.get(1);
  }

  swap(i, j) {
    let tmp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = tmp;
  }

  compare(i, j) {
    let small = isSmaller(this.data[i].value, this.data[j].value) < 0;
    return this.heapType === HeapType.MIN ? small : !small;
  }

  bubbleUp(index) {
    let parent = Math.floor(index / 2);
    if (parent === 0) {
      return;
    }
    if (this.compare(index, parent)) {
      this.lastIndex = parent;
      this.swap(index, parent);
      this.bubbleUp(parent);
    }
  }

  bubbleDown(index) {
    let left = index * 2;
    let right = index * 2 + 1;

    let largest = index;
    if (left < this.data.length && this.compare(left, largest))
      largest = left;

    if (right < this.data.length && this.compare(right, largest))
      largest = right;

    if (largest !== index) {
      this.lastIndex = largest;
      this.swap(largest, index);
      this.bubbleDown(largest);
    }
  }

  empty() {
    return this.data.length - 1 === 0;
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

    this.graph = new Graph(this.top + 3.5 * SPACE, /* directed */ false);
    for (let index = 1; index < this.data.length; index++) {
      this.graph.addNode(index, this.data[index].color, this.data[index].value);

      if (index * 2 < this.data.length) {
        this.graph.addEdge(index, index * 2);
      }
      if (index * 2 + 1 < this.data.length) {
        this.graph.addEdge(index, index * 2 + 1);
      }
    }

    this.graph.arrangeAsTree();

    return this.graph.draw;
  }
}