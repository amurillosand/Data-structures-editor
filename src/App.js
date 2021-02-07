import React, { Component } from 'react';

import Canvas from "./Canvas";
import { getRandom, isColor, divideByTokens } from "./Stuff";
import "./styles.css"
import "./button.css"

const defaultColorNode = '#c9a9ff'

class App extends Component {
  constructor() {
    super()

    this.state = {
      nodes: [],
      edges: [],
      nodesColor: new Map(),
      edgesSet: new Set(),
      drawTrie: false,
      drawGraph: true,
    }
  }

  getInput(e) {
    this.setState((prev) => {
      const objects = e.target.value.split('\n').map((line) => {
        return divideByTokens(line);
      });

      var nodesColor = new Map();
      var edgesSet = new Set()

      function addNode(u, color = defaultColorNode) {
        nodesColor.set(u, color); // update color or set it for first time 
      }

      function addEdge(u, v, weight) {
        // Adds the edges to a set to use them later
        if (!nodesColor.has(u))
          addNode(u);
        if (!nodesColor.has(v))
          addNode(v);
        edgesSet.add({u, v, weight});
      }

      /*
        u
        u color
        u v
        u v weight
      */
      
      // Add all the current objects
      for (let object of objects) {
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

      console.log(nodesColor);
      console.log(edgesSet);

      function findNode(nodes, u) {
        // Finds the node 'u' in the current 'nodes' array
        var pos = nodes.map((node) => {
          return node.text;
        }).indexOf(u);

        return nodes[pos];
      }

      // Calculate things in common (get current objects from previous objects)
      var nodes = []
      for (var [u, color] of nodesColor) {
        if (prev.nodesColor.has(u)) {
          // node in common with the previous version
          var node = findNode(prev.nodes, u);
          node.color = color;
          nodes.push(node);
        } else {
          // create a completely new node
          const x = getRandom(0, 400);
          const y = getRandom(0, 400);
          nodes.push({x, y, r: 25, color, text: u});
        }
      }

      var edges = [];
      for (var edge of edgesSet) {
        if (prev.edgesSet.has(edge)) {
          // edge in common with the previous version
          var pos = prev.edges.indexOf(edge);
          edges.push(prev.edge[pos]);
        } else {
          // create a new node
          const u = findNode

        }
      }

      return {
        nodesColor: nodesColor,
        edgesSet: edgesSet,
        nodes: nodes,
        edges: edges,
      }
    });
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

          <Canvas 
            nodes={this.state.nodes} 
            edges={this.state.edges} />
        </div>
      </div>
    );
  }
}

export default App;