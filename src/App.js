import React, { Component } from 'react';

import Canvas from "./Canvas";
import { isNumeric, isColor, divideByTokens } from "./Stuff";
import { getNode, getEdge } from "./Graph";
import "./styles.css"
import "./button.css"

class App extends Component {
  constructor() {
    super()

    this.state = {
      nodes: [],
      edges: [],
      nodePos: new Map(),
      edgePos: new Map(),
      drawTrie: false,
      drawGraph: true,
    }
  }

  getInput(e) {
    this.setState((prev) => {
      const objects = e.target.value.split('\n').map((line) => {
        return divideByTokens(line);
      });

      console.log(objects);

      // 

      var nodes = [];
      var nodePos = new Map();
      var edges = [];
      var edgePos = new Map();

      // Things in common with the previous version.

      function addNode(u, color) {
        if (nodePos.has(u)) {
          console.log(nodes[nodePos[u]]);
          nodes[nodePos[u]].setColor(color); // update the color
        } else {
          nodePos.set(u, nodes.length);
          nodes.push(getNode(u, color)) // add the node to the map
        }
      }

      function eraseNode(u) {
        if (nodePos.has(u)) {
          // the node exists, so we can erase it
          nodes.splice(nodePos[u], 1);
          nodePos.delete(u);
        }
      }

      function addEdge(u, v, weight) {
     


      }

      /*
        u
        u color
        u v
        u v w
      */

      for (let object of objects) {
        if (object.length == 0) 
          continue;

        if (object.length == 1) {
          const u = object[0];
          // Single node
          addNode(u, '#c9a9ff');
        } else if (object.length == 2) {
          const u = object[0];
          const x = object[1];
          if (isColor(x)) {
            // Node with color x
            addNode(u, x);
          } else {
            // Edge u -> v (depends the flag)
            const v = object[1];
            addEdge(u, v, 0);
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
        nodes: nodes,
        nodePos: nodePos,
      }
    })
  }

  drawGraphButton(e) {
    this.setState({
      drawGraph: true,
      drawTrie: false
    });
  }

  drawTrieButton(e) {
    this.setState({
      drawGraph: false,
      drawTrie: true
    });
  }

  render() {
    return (
      <div>
        <div className="multi-button">
          <button>Graph editor</button>

          <button onClick={this.drawGraphButton.bind(this)} >
            Draw Graph
          </button>

          <button onClick={this.drawTrieButton.bind(this)}>
            Draw trie
          </button>
        </div>

        <div>
          <textarea
            type="text"
            className="input"
            onChange={this.getInput.bind(this)}
            >
          </textarea>

          <Canvas nodes={this.state.nodes} />
        </div>
      </div>
    );
  }
}

export default App;