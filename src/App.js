import React, { useEffect, useState } from 'react';
import "./styles.css"

import Canvas from "./components/Canvas";
import Text from "./drawable-components/Text";

import { TextParser } from './utils/TextParser';
import { TEXT_SPACE } from './utils/Utils';

const placeholderText =
  "[color]\nChanges all elements below with this color within the same data structure\n\n" +
  "[command] Optional command, if not added that's the default behaviour or is an optional style \n\n" +
  "-------\n\n" +
  "Array | Vector [name]\n" +
  "[push_back] value [color]\n" +
  "pop_back\n\n\n" +
  "" +
  "Matrix [name]\n" +
  "mat[1,1] mat[1,2] ... mat[1, c]\n" +
  "mat[2,1] mat[2,2] ...\n...\n" +
  "mat[r,1] [color]\n\n\n" +
  "" +
  "Stack | Queue [name]\n" +
  "[push] value [color]\n" +
  "pop\n\n\n" +
  "" +
  "Deque [name]\n" +
  "[push_back] value [color]\n" +
  "push_front value [color]\n" +
  "pop_back\n" +
  "pop_front\n\n\n" +
  "" +
  // "Graph\n" +
  // "u [color] (add node)\n" +
  // "u v [weight] [color] [dash] (add edge)\n\n" +
  // "Trie\n" +
  // "word [color]\n...\n\n" +
  "";


const arrayExample = "array Arreglo\n" +
  "1 -20000 3\n" +
  "blue\n" +
  "4 -0.0005 600\n" +
  "orange\n" +
  "7 80 9000 10 purple 11 12 red\n" +
  "sort\n" +
  "reverse\n\n";

const matrixExample = "matrix Matriz colorida\n" +
  "1 2 3\n" +
  "red\n" +
  "4 5 orange 6\n" +
  "7 purple 8 9 pink\n" +
  "blue\n" +
  "10 11 12\n\n";

const stackExample = "stack Pila\n" +
  "push 1\n" +
  "push 2 blue\n" +
  "push 3\n" +
  "4\n" +
  "pop\n" +
  "pop\n" +
  "5 red\n" +
  "orange\n" +
  "6\n" +
  "7\n\n";

const queueExample = "queue Cola\n" +
  "push 1\n" +
  "push 2 blue\n" +
  "push 3\n" +
  "4\n" +
  "pop\n" +
  "pop\n" +
  "5 red\n" +
  "orange\n" +
  "6\n" +
  "7\n\n";

const dequeExample =
  "deque Doble cola\n" +
  "push_back 1\n" +
  "push_back 2\n" +
  "push_front 3\n" +
  "push_front 4\n" +
  "push_front 5\n" +
  "push_back 6\n" +
  "push_back 7\n" +
  "pop_front\n" +
  "pop_back\n" +
  "pop_front\n\n"

const heapExample =
  "priority_queue Priority_queue\n" +
  "min\n" +
  "push 1\n" +
  "push 5 purple\n" +
  "3 6\n" +
  "orange\n" +
  "4 blue\n" +
  "100 red\n" +
  "200 500\n" +
  "pop\n\n";

const setExample =
  "set Set\n" +
  "insert 1\n" +
  "insert 1\n" +
  "insert 5 purple\n" +
  "3 6\n" +
  "orange\n" +
  "4 blue\n" +
  "100 red\n" +
  "200 500\n" +
  "erase 5\n" +
  "erase 100\n\n";

const mapExample =
  "map Map\n" +
  "insert 1 2\n" +
  "insert 3 4\n" +
  "5 6\n" +
  "erase 3\n" +
  "insert 19 perro\n" +
  "red\n" +
  "5 gato\n" +
  "6 conejo\n\n";

const mapExample2 =
  "map Map como arreglo\n" +
  "asArray\n" +
  "insert gato 1 blue\n" +
  "insert perro 2 orange\n" +
  "conejo 3\n" +
  "pato 4\n" +
  "red\n" +
  "tortuga 5\n" +
  "hamster 6\n\n";

const example = arrayExample + matrixExample + stackExample + queueExample + dequeExample + heapExample + setExample + mapExample + mapExample2;

export default function App() {
  const [text, setText] = useState(example);
  const [parser, setParser] = useState(new TextParser(""));

  useEffect(() => {
    const newParser = new TextParser(text, parser);
    setParser(newParser);
    // console.log(newParser.objects);
  }, [text]);

  return (
    <div class="global-div">
      {/* <div>
        <button>
          {"Drawing a " + (this.state.drawGraph ? "graph" : "trie")}
        </button>

        <button>
          {likeTree ? "ordered as a tree" : "randomly ordered"}
        </button>

        <button>
          {directed ? "directed" : "un-directed"}
        </button>

        <button>
          {"drag " + (drag ? "all" : "a single node")}
        </button>
      </div> */}

      <div class="image-wrapper">
        <textarea
          type="text"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholderText}
        />

        <Canvas
          objects={parser.objects.map((object) => [
            object.draw,
            object.name ? <Text
              x={object.left - TEXT_SPACE}
              y={object.top - TEXT_SPACE}
              text={`${object.name}:`} /> : null
          ])}
        />
      </div>
    </div>
  );
}