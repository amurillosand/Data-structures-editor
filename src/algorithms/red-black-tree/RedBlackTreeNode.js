'use strict';

/**
 * Node of the red black tree
 * constructor
 * param key : Number
 * param value : Object
 * param left : Node
 * param right : Node
 * param color : Number
 */

export const NodeColor = {
  RED: 0,
  BLACK: 1
}

export class RedBlackTreeNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = null;
    this.parent = null;
  }

  /**
  * return Boolean
  */
  isRed() {
    return this.color === NodeColor.RED
  }

  getValue() {
    return {
      key: this.key,
      value: this.value,
    }
  }
}

export function isNilNode(node) {
  return node == null || (node.key == null && node.value == null
    && node.color === NodeColor.BLACK
    && node.left == null && node.right == null);
}
