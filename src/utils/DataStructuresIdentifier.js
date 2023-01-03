export class DataStructuresIdentifier {
  static isVector(line) {
    return line.startsWith("array") || line.startsWith("vector");
  }

  static isMatrix(line) {
    return line.startsWith("matrix");
  }

  static isStack(line) {
    return line.startsWith("stack");
  }

  static isQueue(line) {
    return line.startsWith("queue");
  }

  static isDeque(line) {
    return line.startsWith("deque");
  }

  static isHeap(line) {
    return line.startsWith("priority_queue") || line.startsWith("heap");
  }

  static isSet(line) {
    return line.startsWith("set");
  }

  static isMap(line) {
    return line.startsWith("map");
  }

  static isGraph(line) {
    return line.startsWith("graph");
  }

  static isTrie(line) {
    return line.startsWith("trie");
  }

  // Returns if the line of text is an object known or not
  static isObject(line) {
    line = line.toLowerCase();
    return this.isVector(line) || this.isMatrix(line) ||
      this.isStack(line) || this.isQueue(line) ||
      this.isDeque(line) || this.isHeap(line) ||
      this.isSet(line) || this.isMap(line) ||
      this.isGraph(line) || this.isTrie(line);
  }
}