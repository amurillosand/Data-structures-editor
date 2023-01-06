import { isColor, divideByTokens, isSmaller, getColor } from "./Utils";
import { VERTICAL_DISTANCE, BLOCK_HEIGHT } from "./Utils"

import { Graph } from "../data-structures/Graph";
import { Trie } from "../data-structures/Trie";
import { Sides, Vector } from "../data-structures/Vector";
import { Matrix } from "../data-structures/Matrix";
import { Stack } from "../data-structures/Stack";
import { Queue } from "../data-structures/Queue";
import { Deque } from "../data-structures/Deque";
import { Heap, HeapType } from "../data-structures/Heap";
import { STLSet } from "../data-structures/STLSet";
import { STLMap, LastAction } from "../data-structures/STLMap";

import { Indices } from "../data-structures/Indices";
import { STLIndices } from "../data-structures/STLIndices";

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

      // add top, bottom, front, back, begin, end if it is a stack, queue, deque, heap, set, map
      if (DataStructuresIdentifier.isStack(element.type) ||
        DataStructuresIdentifier.isQueue(element.type) ||
        DataStructuresIdentifier.isDeque(element.type) ||
        DataStructuresIdentifier.isHeap(element.type) ||
        DataStructuresIdentifier.isSet(element.type) ||
        DataStructuresIdentifier.isMap(element.type)) {
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
    } else if (DataStructuresIdentifier.isSet(element.type)) {
      return this.getSet(element.lines);
    } if (DataStructuresIdentifier.isMap(element.type)) {
      return this.getMap(element.lines);
    } if (DataStructuresIdentifier.isGraph(element.type)) {
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
        vector.currentColor = getColor(line[0]);
        continue;
      }

      for (const element of line) {
        if (CppIdentifier.isSort(element)) {
          sortArray = true;
        } else if (CppIdentifier.isReverse(element)) {
          reverseArray = !reverseArray;
        } else if (isColor(element)) {
          // update color of the last element if any
          vector.updateLastElementColor(getColor(element));
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
        matrix.currentColor = getColor(line[0]);
        continue;
      }

      let newRowAdded = false;
      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          matrix.updateLastElementColor(getColor(element));
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
        queue.currentColor = getColor(line[0]);
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          queue.updateLastElementColor(getColor(element));
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
        stack.currentColor = getColor(line[0]);
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          stack.updateLastElementColor(getColor(element));
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
        deque.currentColor = getColor(line[0]);
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          deque.updateLastElementColor(getColor(element));
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
        heap.currentColor = getColor(line[0]);
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          heap.updateLastElementColor(getColor(element));
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

  getSet(lines) {
    const set = new STLSet(this.lastTop);

    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        set.currentColor = getColor(line[0]);
        continue;
      }

      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          set.updateLastElementColor(getColor(element));
        } else if (CppIdentifier.isErase(element)) {
          set.lastAction = LastAction.ERASE;
        } else if (CppIdentifier.isInsert(element)) {
          set.lastAction = LastAction.INSERT;
        } else if (CppIdentifier.asArray(element)) {
          set.asArray = true;
        } else if (CppIdentifier.asTree(element)) {
          set.asArray = false;
        }else {
          if (set.lastAction === LastAction.INSERT) {
            set.insert(element);
          } else {
            set.erase(element);
          }
          // reset set to insert as default
          set.lastAction = LastAction.INSERT;
        }
      }
    }

    set.updateHeight();

    return set;
  }

  getMap(lines) {
    const map = new STLMap(this.lastTop);

    for (const line of lines) {
      if (line.length === 1 && isColor(line[0])) {
        map.currentColor = getColor(line[0]);
        continue;
      }

      let key = null;
      let value = null;
      for (const element of line) {
        if (isColor(element)) {
          // update color of the last element if any
          map.updateLastElementColor(getColor(element));
        } else if (CppIdentifier.isErase(element)) {
          map.lastAction = LastAction.ERASE;
        } else if (CppIdentifier.isInsert(element)) {
          map.lastAction = LastAction.INSERT;
        } else if (CppIdentifier.asArray(element)) {
          map.asArray = true;
        } else if (CppIdentifier.asTree(element)) {
          map.asArray = false;
        } else {
          if (map.lastAction === LastAction.INSERT) {
            if (key === null) {
              key = element;
            } else if (key !== null) {
              value = element;
              map.insert(key, value);
              key = null;
              value = null;
            }
          } else {
            map.erase(element);
            key = null;
            value = null;
          }
          // reset map to insert as default
          map.lastAction = LastAction.INSERT;
        }
      }
    }

    map.updateHeight();

    return map;
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