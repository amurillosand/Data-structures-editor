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
      edgesSet: new Set(),
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
      var edgesSet = new Set()

      function addNode(node, color = defaultColorNode) {
        nodesColor.set(node, color); // update color or set it for first time 
      }

      function addEdge(from, to, weight) {
        // Adds the edges to a set to use them later
        if (!nodesColor.has(from))
          addNode(from);
        if (!nodesColor.has(to))
          addNode(to);
        edgesSet.add({ from, to, weight });
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
          // Edge u -> v with weight
          const u = object[0];
          const v = object[1];
          const weight = object[2];
          addEdge(u, v, weight);
        }
      }

      return {
        nodesColor: nodesColor,
        edgesSet: edgesSet,
      }
    });
  }

  toDrawButton(e) {
    this.setState((prev) => {
      return {drawGraph: !prev.drawGraph}
    });
  }

  directedEdges(e) {
    this.setState((prev) => {
      return {directed: !prev.directed}
    });
  }


  render() {
    return (
      <div>
        <div className="multi-button">
          <button onClick={this.toDrawButton.bind(this)}> 
            {this.state.drawGraph ? 'Draw trie' : 'Draw graph'}
          </button>

          <button onClick={this.directedEdges.bind(this)}>
            {"draw " + (this.state.directed ? "Un-directed" : "Directed")} 
          </button>
        </div>

        <div>
          <textarea
            type="text"
            className="input"
            onChange={this.getInput.bind(this)} >
          </textarea>

          <Canvas
            nodesColor={this.state.nodesColor}
            edgesSet={Array.from(this.state.edgesSet)}
            directed={this.state.directed} />
        </div>
      </div>
    );
  }
}

export default App;