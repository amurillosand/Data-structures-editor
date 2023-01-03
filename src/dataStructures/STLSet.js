import { STLMap } from "./STLMap";

export class STLSet extends STLMap {
  constructor(top, name = "Set") {
    super(top, name);
  }

  getNodeLabel(node) {
    return node.value.key;
  }
}