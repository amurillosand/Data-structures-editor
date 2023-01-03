import RbTree from "red-black-tree-js"
import { distanceX } from "../algorithms/Buchheim";
import EmptyDataStructure from "../drawableComponents/EmptyDataStructure";
import { BLOCK_HEIGHT, DEFAULT_NODE_COLOR, SPACE, toNumber } from "../utils/Utils";
import { Graph } from "./Graph";

export const LastAction = {
  ERASE: 0,
  INSERT: 1,
};

export class STLMap {
  constructor(top, name = "Map") {
    this.name = name;
    this.currentColor = DEFAULT_NODE_COLOR;

    this.left = 0;
    this.top = top;
    this.height = BLOCK_HEIGHT;
    this.width = 0;

    this.tree = new RbTree();
    // To make sure no key is duplicated
    this.nodeKeysSet = new Set();
    this.totalNodesCount = 0;
    this.graph = null;

    this.lastElementKey = null;
    this.lastAction = LastAction.INSERT;
  }

  updateHeight() {
    if (this.nodeKeysSet.size <= 1) {
      this.height = BLOCK_HEIGHT;
    } else {
      let treeHeight = Math.max(0, this.tree.findHeight(this.tree.root) - 1);
      this.height = treeHeight * distanceX + BLOCK_HEIGHT * 2;
    }
  }

  updateLastElementColor(color) {
    if (this.lastElementKey) {
      const prevValue = this.tree.find(this.lastElementKey);
      this.tree.update(this.lastElementKey, {
        ...prevValue,
        color: color,
      });
    }
  }

  insert(key, value = "", color = null) {
    key = toNumber(key);
    if (!this.nodeKeysSet.has(key)) {
      this.nodeKeysSet.add(key);
      this.tree.insert(key, {
        key: key,
        value: value,
        color: color ?? this.currentColor,
      });
    } else {
      const prevValue = this.tree.find(key);
      this.tree.update(key, {
        ...prevValue,
        value: value,
      });
    }
    this.lastElementKey = key;
  }

  erase(key) {
    key = toNumber(key);
    this.tree.remove(key);
    this.nodeKeysSet.delete(key);
  }

  empty() {
    return this.tree.root === null;
  }

  size() {
    return this.nodeKeysSet.size;
  }

  getNodeLabel(node) {
    return `{${node.value.key}, ${node.value.value}}`;
  }

  dfs(node) {
    if (node.key === null)
      return;

    const nodeData = node.value;
    this.graph.addNode(nodeData.key, nodeData.color, this.getNodeLabel(node));

    if (node.left.key !== null) {
      this.dfs(node.left);
      this.graph.addEdge(nodeData.key, node.left.value.key);
    }

    if (node.right.key !== null) {
      this.dfs(node.right);
      this.graph.addEdge(nodeData.key, node.right.value.key);
    }
  }

  beginNode() {
    const node = this.tree.minNode();
    const nodeKey = node.value.key;
    return this.graph.nodes.get(nodeKey);
  }

  endNode() {
    const node = this.tree.maxNode();
    const nodeKey = node.value.key;
    return this.graph.nodes.get(nodeKey);
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

    this.graph = new Graph(this.top + SPACE, /* directed */ false);
    this.dfs(this.tree.root);
    this.graph.arrangeAsTree();

    return this.graph.draw;
  }
}