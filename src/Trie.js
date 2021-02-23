const defaultColorNode = "#c9a9ff";

class Node {
  constructor(id, color = defaultColorNode) {
    this.id = id;
    this.isWord = false;
    this.color = color;
    this.children = new Map();
  }

  go(c) {
    return this.children.get(c);
  }
}

export default class Trie {
  constructor(addNode, addEdge) {
    this.root = new Node(-1);
    this.cnt = 0;
    this.addNode = addNode;
    this.addEdge = addEdge;
  }

  insert(word, color) {
    var node = this.root;
    for (var c of word) {
      if (!node.children.has(c)) {
        node.children.set(c, new Node(this.cnt++));
      }
      node = node.go(c)
    }
    node.isWord = true;
    node.color = color;
  }

  dfs(node, label) {
    this.addNode(node.id, label, node.color);
    for (var [c, child] of node.children) {
      this.dfs(child, c);
      this.addEdge(node.id, child.id);
    }
  }
}
