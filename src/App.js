import React, { Component } from 'react';

import Canvas from "./Canvas";
import { isColor, divideByTokens } from "./Stuff";
import "./styles.css"
import "./button.css"

// const defaultColorNode = "#c9a9ff"
const defaultColorNode = "#a181d7"

class App extends Component {
  constructor() {
    super()

    this.state = {
      nodesColor: new Map(),
      edges: new Map(),
      drawGraph: true,
      directed: true
    }
  }

  getInput(e) {
    this.setState(() => {
      const objects = e.target.value.split('\n').map((line) => {
        return divideByTokens(line);
      });

      var nodesColor = new Map();
      var edges = new Map()

      function addNode(node, color = defaultColorNode) {
        nodesColor.set(node, color); // update color or set it for first time 
      }

      function addEdge(from, to, weight, color = "black") {
        // Adds the edges to a set to use them later
        if (!nodesColor.has(from))
          addNode(from);
        if (!nodesColor.has(to))
          addNode(to);

        if (!edges.has({ from, to })) {
          edges.set({ from, to }, { weight, color });
        } else {
          var val = edges.get({ from, to });
          if (weight.length > 0) {
            val.weight = weight;
          }
          if (color !== "black") {
            val.color = color;
          }
          edges.set({ from, to }, val);
        }
      }

      /*
        u
        u color
        u v
        u v weight
      */

      // Add all the current objects
      for (var object of objects) {
        if (object.length == 0)
          continue;

        if (object.length == 1) {
          const u = object[0];
          // Single node
          addNode(u);
        } else if (object.length == 2) {
          const u = object[0];
          const x = object[1];
          if (isColor(x)) {
            // Node with color x
            addNode(u, x);
          } else {
            // Edge u -> v (depends on the flag)
            const v = object[1];
            addEdge(u, v, "");
          }
        } else if (object.length == 3) {
          const u = object[0];
          const v = object[1];
          const x = object[2];
          if (isColor(x)) {
            // Edge u -> v with color
            addEdge(u, v, "", x);
          } else {
            // Edge u -> v with weight
            const weight = object[2];
            addEdge(u, v, weight);
          }
        } else if (object.length == 4) {
          const u = object[0];
          const v = object[1];
          var weight = object[2];
          var x = object[3];
          if (isColor(weight)) {
            [x, weight] = [weight, x];
          } 
          
          if (isColor(x)) {
            addEdge(u, v, weight, x);
          } else {
            console.log("wtf bro!!!");
          }
        }
      }

      return {
        nodesColor: nodesColor,
        edges: edges,
      }
    });
  }

  toDrawButton(e) {
    this.setState((prev) => {
      return { drawGraph: !prev.drawGraph }
    });
  }

  directedEdges(e) {
    this.setState((prev) => {
      return { directed: !prev.directed }
    });
  }

  render() {
    const placeholderText = [
      "   Draw trie\n" +
      "List down all strings of the trie\n" +
      "str [color] [label]",

      "   Draw graph\n" +
      "[opt] means optional\n\n" +
      "Nodes:\n" +
      "u [color]\n\n" +
      "Edges:\n" +
      "u v [weight] [color]\n" +
      "u v [color] [weight]\n"
    ];

    return (
      <div>
        <div className="multi-button">
          <button onClick={this.toDrawButton.bind(this)}>
            {"Drawing " + (this.state.drawGraph ? "graph" : "trie")}
          </button>

          <button onClick={this.directedEdges.bind(this)}>
            {this.state.directed ? "Directed" : "Un-directed"}
          </button>
        </div>

        <div>
          <textarea
            type="text"
            className="input"
            onChange={this.getInput.bind(this)}
            placeholder={placeholderText[this.state.drawGraph ? 1 : 0]} />

          <Canvas
            nodesColor={this.state.nodesColor}
            edges={Array.from(this.state.edges)}
            directed={this.state.directed} />
        </div>
      </div>
    );
  }
}

export default App;