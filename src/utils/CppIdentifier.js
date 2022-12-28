export class CppIdentifier {
  static isPush(line) {
    return line === "push";
  }

  static isPushBack(line) {
    return line === "push_back";
  }

  static isPushFront(line) {
    return line === "push_front";
  }

  static isPop(line) {
    return line === "pop";
  }

  static isPopBack(line) {
    return line === "pop_back";
  }

  static isPopFront(line) {
    return line === "pop_front";
  }

  static isTop(line) {
    return line === "top";
  }
}