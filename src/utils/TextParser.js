import { isColor, divideByTokens, isSmaller } from "./Utils";
import { VERTICAL_DISTANCE, BLOCK_HEIGHT } from "./Utils"

import { Graph } from "../dataStructures/Graph";
import { Trie } from "../dataStructures/Trie";
import { Sides, Vector } from "../dataStructures/Vector";
import { Matrix } from "../dataStructures/Matrix";
import { Stack } from "../dataStructures/Stack";
import { Queue } from "../dataStructures/Queue";
import { Deque } from "../dataStructures/Deque";
import { Heap, HeapType } from "../dataStructures/Heap";

import { Indices } from "../dataStructures/Indices";
import { STLIndices } from "../dataStructures/STLIndices";

import { DataStructuresIdentifier } from "./DataStructuresIdentifier";
import { CppIdentifier } from "./CppIdentifier";

export class TextParser {
  constructor(text, oldParser = null) {
    const lines = text.split('\n').filter((line) => {
      return line.length > 0;
    });

    this.textObjects = this.splitInTextObjects(lines);

    this.objects = [];
    this.lastTop = 0;
    let objectCount = new Map();
    this.textObjects.forEach((element, index) => {
      let object = this.getObject(element, null);
      this.lastTop += object.height;
      this.lastTop += VERTICAL_DISTANCE;

      if (element.name) {
        object.name = element.name;
      } else {
        const id = (objectCount.get(object.name) ?? 0) + 1;
        objectCount.set(object.name, id);
        object.name += " " + id;
      }

      this.objects.push(object);

      // add indices if is a vector, array or matrix
      if (DataStructuresIdentifier.isVector(element.type) ||
        DataStructuresIdentifier.isMatrix(element.type)) {
        this.objects.push(new Indices(element.type, object));
      }

      // add top, bottom, front, back if is a stack, queue, deque
      if (DataStructuresIdentifier.isStack(element.type) ||
        DataStructuresIdentifier.isQueue(element.type) ||
        DataStructuresIdentifier.isDeque(element.type) ||
        DataStructuresIdentifier.isHeap(element.type)) {
        this.objects.push(new STLIndices(element.type, object));
      }
    });
  }

  getObject(element, previousObject = null) {
    if (DataStructuresIdentifier.isVector(element.type)) {
      return this.getVector(element.lines);
    } else if (DataStructuresIdentifier.isMatrix(element.type)) {
      return this.getMatrix(element.lines);
    } else if (DataStructuresIdentifier.isStack(element.type)) {
      return this.getStack(element.lines);
    } else if (DataStructuresIdentifier.isQueue(element.type)) {
      return this.getQueue(element.lines);
    } else if (DataStructuresIdentifier.isDeque(element.type)) {
      return this.getDeque(element.lines);
    } else if (DataStructuresIdentifier.isHeap(element.type)) {
      return this.getHeap(element.lines);
    } else if (DataStructuresIdentifier.isGraph(element.type)) {
      return this.getGraph(element.lines, null);
    } else if (DataStructuresIdentifier.isTrie(element.type)) {
      return this.getTrie(element.lines);
    }
    return null;
  }

  getNameIfAny(line) {
    let tokens = divideByTokens(line);
    tokens.shift();
    return tokens.join(" ");
  }

  splitInTextObjects(lines) {
    // Objets are in the form [{ object type, lines of text }]
    let objects = [];
    let start = -1;
    for (let pos = 0; pos <= lines.length; pos++) {
      if (pos === lines.length || DataStructuresIdentifier.isObject(lines[pos])) {
        if (start !== -1) {
          objects.push({
            type: divideByTokens(lines[start].toLowerCase()).shift(),
            name: this.getNameIfAny(lines[start]),
            lines: lines.slice(start + 1, pos).map((line) => {
              return divideByTokens(line);
            }),
          });
        }
        start = pos;
      }
    }
    return objects;
  }

  getVector(lines) {
    const vector = new Vector(this.lastTop);

    let sortArray = false;
    let reverseArray = false;
    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        vector.currentColor = line[0];
        continue;
      }

      for (const element of line) {
        if (element === "sort") {
          sortArray = true;
        } else if (element === "reverse") {
          reverseArray = !reverseArray;
        } else if (isColor(element)) {
          // update color of the last element if any
          vector.updateLastElementColor(element);
        } else if (CppIdentifier.isPushBack(element)) {
          // ignore this word :p
          continue;
        } else if (CppIdentifier.isPopBack(element)) {
          vector.popBack();
        } else {
          vector.pushBack(element);
        }
      }
    }

    if (sortArray) {
      vector.data.sort((a, b) => isSmaller(a.value, b.value));
    }

    if (reverseArray) {
      vector.data.reverse();
    }

    return vector;
  }

  getMatrix(lines) {
    const matrix = new Matrix(this.lastTop);

    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        matrix.currentColor = line[0];
        continue;
      }

      let newRowAdded = false;
      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          matrix.updateLastElementColor(element);
        } else {
          if (!newRowAdded) {
            matrix.addRow();
            newRowAdded = true;
          }
          matrix.lastRowPushBack(element);
        }
      }
    }

    if (matrix.empty()) {
      matrix.height = BLOCK_HEIGHT;
    }

    return matrix;
  }

  getQueue(lines) {
    const queue = new Queue(this.lastTop);

    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        queue.currentColor = line[0];
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          queue.updateLastElementColor(element);
        } else if (CppIdentifier.isPush(element)) {
          // ignore this word :p
          continue;
        } else if (CppIdentifier.isPop(element)) {
          queue.pop();
        } else {
          queue.push(element);
        }
      }
    }

    return queue;
  }

  getStack(lines) {
    const stack = new Stack(this.lastTop);

    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        stack.currentColor = line[0];
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          stack.updateLastElementColor(element);
        } else if (CppIdentifier.isPush(element)) {
          // ignore this word :p
          continue;
        } else if (CppIdentifier.isPop(element)) {
          stack.pop();
        } else {
          stack.push(element);
        }
      }
    }

    stack.updateHeight();

    return stack;
  }

  getDeque(lines) {
    const deque = new Deque(this.lastTop);

    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        deque.currentColor = line[0];
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          deque.updateLastElementColor(element);
        } else if (CppIdentifier.isPushBack(element)) {
          deque.side = Sides.BACK;
        } else if (CppIdentifier.isPushFront(element)) {
          deque.side = Sides.FRONT;
        } else if (CppIdentifier.isPopBack(element)) {
          deque.popBack();
        } else if (CppIdentifier.isPopFront(element)) {
          deque.popFront();
        } else {
          deque.push(element);
        }
      }
    }

    return deque;
  }

  getHeap(lines) {
    const heap = new Heap(this.lastTop);

    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        heap.currentColor = line[0];
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          heap.updateLastElementColor(element);
        } else if (CppIdentifier.isPop(element)) {
          heap.pop();
        } else if (CppIdentifier.isPush(element)) {
          // ignore this word :p
          continue;
        } else if (CppIdentifier.isMax(element)) {
          heap.heapType = HeapType.MAX;
        } else if (CppIdentifier.isMin(element)) {
          heap.heapType = HeapType.MIN;
        } else {
          heap.push(element);
        }
      }
    }

    heap.updateHeight();

    return heap;
  }

  // getGraph(lines, previousGraph) {
  //   const graph = new Graph(false, previousGraph);

  //   for (const line of lines) {
  //     if (line.length === 1) {
  //       const x = line[0];
  //       if (isColor(x)) {
  //         // paint everything that's below with this color
  //         graph.currentNodeColor = x;
  //       } else {
  //         // Single node
  //         const u = line[0];
  //         graph.addNode(u, {});
  //       }
  //     } else if (line.length === 2) {
  //       const u = line[0];
  //       const x = line[1];
  //       if (isColor(x)) {
  //         // Node with color x
  //         graph.addNode(u, { color: x });
  //       } else {
  //         // Edge u -> v (depends on the flag)
  //         const v = line[1];
  //         graph.addEdge(u, v, "");
  //       }
  //     } else if (line.length >= 3) {
  //       const u = line[0];
  //       const v = line[1];

  //       // Edge u -> v with color | weight | dash
  //       let weight = "";
  //       let color = "black";
  //       let dashedLine = false;
  //       for (let i = 2; i < line.length; i++) {
  //         const x = line[i];
  //         if (isColor(x)) {
  //           color = x;
  //         } else if (isDash(x)) {
  //           dashedLine = true;
  //         } else {
  //           weight += x + " ";
  //         }
  //       }

  //       graph.addEdge(u, v, weight, color, dashedLine);
  //     }
  //   }

  //   return graph;
  // }

  // getTrie(lines) {
  //   const trie = new Trie(addNode, addEdge);
  //   currentNodeColor = "red";
  //   for (const line of lines) {
  //     if (object.length === 1) {
  //       if (isColor(object[0])) {
  //         // change the color of all below nodes
  //         currentNodeColor = object[0];
  //       } else {
  //         // insert a word with the currentNodeColor
  //         const word = object[0];
  //         trie.insert(word, currentNodeColor);
  //       }
  //     } else if (object.length === 2) {
  //       // insert a word with possibly a custom color
  //       const word = object[0];
  //       let color = currentNodeColor;
  //       if (object.length === 2 && isColor(object[1])) {
  //         color = object[1];
  //       }
  //       trie.insert(word, color);
  //     }
  //   }
  //   trie.dfs(trie.root, "*");
  // }
}