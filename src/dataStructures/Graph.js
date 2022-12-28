import { DEFAULT_NODE_COLOR, BLACK } from "../utils/Utils";
import { getRandom } from "../utils/Utils";
import { Loop, Edge } from "../drawableComponents/Edge";
import { Node } from "../drawableComponents/Node";

export class Graph {
  constructor(directed = true, previousGraph = null) {
    this.currentNodeColor = DEFAULT_NODE_COLOR;
    this.nodes = new Map();
    this.edges = new Map();
    this.directed = directed;
    this.previousGraph = previousGraph;
  }

  addNode(node, newProperties) {
    if (!this.hasNode(node)) {
      if (!newProperties.hasOwnProperty("label")) {
        newProperties.label = node;
      }
      if (!newProperties.hasOwnProperty("color")) {
        newProperties.color = this.currentNodeColor;
      }
    } else {
      const prev = this.getNode(node);
      if (!newProperties.hasOwnProperty("label")) {
        newProperties.label = prev.label;
      }
      if (!newProperties.hasOwnProperty("color")) {
        newProperties.color = this.currentNodeColor;
      }
    }
    this.nodes.set(node, newProperties);
  }

  hasNode(node) {
    return this.nodes.has(node);
  }

  getNode(node) {
    return this.nodes.get(node);
  }

  addEdge(from, to, weight = "", color = BLACK, dashedLine = false) {
    // Adds the edges to a set to use them later
    if (!this.hasNode(from))
      this.addNode(from, {});
    if (!this.hasNode(to))
      this.addNode(to, {});

    if (!this.edges.has({ from, to })) {
      this.edges.set({ from, to }, { weight, color, dashedLine });
    } else {
      let newProperties = this.edges.get({ from, to });
      if (weight.length > 0) {
        newProperties.weight = weight;
      }
      if (color !== BLACK) {
        newProperties.color = color;
      }
      if (dashedLine) {
        newProperties.dashedLine = true;
      }
      this.edges.set({ from, to }, newProperties);
    }
  }

  getKey(from, to) {
    if (from > to) {
      [from, to] = [to, from]
    }
    return JSON.stringify({
      from, to
    });
  }

  // updatePosition

  get drawableNodes() {
    const drawableNodes = [];
    this.nodes.forEach((properties, node) => {
      const previousNode = this.previousGraph.getNode(node);

      if (previousNode) {
        properties.x = previousNode.x;
        properties.y = previousNode.y;
      } else {
        // create a completely new node
        properties.x = getRandom(25, 800);
        properties.y = getRandom(25, 600);
      }

      drawableNodes.push(
        <Node
          key={node}
          x={properties.x}
          y={properties.y}
          color={properties.color}
          label={properties.label}
          updatePosition={
            (label, x, y) => {
              const node = this.getNode(label);
              if (node) {
                this.nodes.set(label, { ...node, x, y });
              }
            }
          }
        />
      );
    });

    return drawableNodes;
  }

  get drawableEdges() {
    let sameEdgeCount = new Map();

    const drawableEdges = [];
    this.edges.forEach((properties, edge) => {
      let key = this.getKey(edge);
      let cnt = sameEdgeCount.get(key);
      if (cnt === undefined) {
        cnt = 0;
      }

      if (edge.from === edge.to) {
        drawableEdges.push(
          <Loop
            key={key}
            from={this.nodes.get(edge.from)}
            to={this.nodes.get(edge.to)}
            weight={properties.weight}
            color={properties.color}
            directed={this.directed} />
        );
      } else {
        drawableEdges.push(
          <Edge
            rank={cnt}
            key={key}
            from={this.nodes.get(edge.from)}
            to={this.nodes.get(edge.to)}
            weight={properties.weight}
            color={properties.color}
            dashedLine={properties.dashedLine}
            directed={this.directed} />
        );
      }

      sameEdgeCount.set(key, cnt + 1);
    });

    return drawableEdges;
  }

  get draw() {
    // prettify(this);
    return [...this.drawableEdges, ...this.drawableNodes];
  }
}