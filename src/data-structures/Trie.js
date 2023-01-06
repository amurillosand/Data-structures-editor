import { DEFAULT_COLOR } from "../utils/Utils";
import { Graph } from "./Graph";

class Node {
  constructor(id, color = DEFAULT_COLOR) {
    this.id = id;
    this.isWord = false;
    this.color = color;
    this.children = new Map();
  }

  go(c) {
    return this.children.get(c);
  }
}

export class Trie {
  constructor() {
    this.root = new Node(-1);
    this.cnt = 0;
    this.graph = new Graph();
  }

  insert(word, color) {
    let node = this.root;
    for (let c of word) {
      if (!node.children.has(c)) {
        node.children.set(c, new Node(this.cnt++));
      }
      node = node.go(c)
    }
    node.isWord = true;
    node.color = color;
  }

  dfs(node, label) {
    this.addNode(node.id, { label: label, color: node.color });
    for (let [c, child] of node.children) {
      this.dfs(child, c);
      this.addEdge(node.id, child.id);
    }
  }
}
