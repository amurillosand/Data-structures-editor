import {toLowerCase} from "./Utils";

export class CppIdentifier {
  static isPush(line) {
    return toLowerCase(line) === "push";
  }

  static isPushBack(line) {
    return toLowerCase(line) === "push_back";
  }

  static isPushFront(line) {
    return toLowerCase(line) === "push_front";
  }

  static isPop(line) {
    return toLowerCase(line) === "pop";
  }

  static isPopBack(line) {
    return toLowerCase(line) === "pop_back";
  }

  static isPopFront(line) {
    return toLowerCase(line) === "pop_front";
  }

  static isTop(line) {
    return toLowerCase(line) === "top";
  }

  static isSort(line) {
    return toLowerCase(line) === "sort";
  }

  static isReverse(line) {
    return toLowerCase(line) === "reverse";
  }

  static isMin(line) {
    return toLowerCase(line) === "min";
  }

  static isMax(line) {
    return toLowerCase(line) === "max";
  }

  static isInsert(line) {
    return toLowerCase(line) === "insert";
  }

  static isErase(line) {
    return toLowerCase(line) === "erase";
  }

  static asArray(line) {
    return toLowerCase(line) === "asarray";
  }

  static asTree(line) {
    return toLowerCase(line) === "astree";
  }
}