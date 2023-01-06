import {toLowerCase} from "./Utils";

export class DataStructuresIdentifier {
  static isVector(line) {
    return toLowerCase(line).startsWith("array") || toLowerCase(line).startsWith("vector");
  }

  static isMatrix(line) {
    return toLowerCase(line).startsWith("matrix");
  }

  static isStack(line) {
    return toLowerCase(line).startsWith("stack");
  }

  static isQueue(line) {
    return toLowerCase(line).startsWith("queue");
  }

  static isDeque(line) {
    return toLowerCase(line).startsWith("deque");
  }

  static isHeap(line) {
    return toLowerCase(line).startsWith("priority_queue") || toLowerCase(line).startsWith("heap");
  }

  static isSet(line) {
    return toLowerCase(line).startsWith("set");
  }

  static isMap(line) {
    return toLowerCase(line).startsWith("map");
  }

  static isGraph(line) {
    return toLowerCase(line).startsWith("graph");
  }

  static isTrie(line) {
    return toLowerCase(line).startsWith("trie");
  }

  // Returns if the line of text is an object known or not
  static isObject(line) {
    line = toLowerCase(line).toLowerCase();
    return this.isVector(line) || this.isMatrix(line) ||
      this.isStack(line) || this.isQueue(line) ||
      this.isDeque(line) || this.isHeap(line) ||
      this.isSet(line) || this.isMap(line) ||
      this.isGraph(line) || this.isTrie(line);
  }
}