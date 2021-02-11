import React, { Component } from "react";
import "./styles.css"

import Node from "./Node";
import Edge from "./Edge";

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      printableNodes: [],
      printableEdges: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      console.clear();
      console.log("Update!!!!!");
      console.log("Nodes", this.props.nodes);
      console.log("Edges", this.props.edges);

      const printableNodes = this.props.nodes.map((node) => {
        return (
          <Node
            key={node.text}
            x={node.x} y={node.y} r={node.r}
            color={node.color}
            text={node.text} />
        );
      });
      console.log("Nodes to print", printableNodes);

      const printableEdges = [];
      for (const edge of this.props.edges) {
        const from = printableNodes.find(item => item.key === edge.from);
        const to = printableNodes.find(item => item.key === edge.to);

        printableEdges.push(
          <Edge 
            from={from}
            ref={printableNodes}
            to={to} />
        );
      }
      console.log("Edges to print", printableEdges);

      this.setState({
        printableNodes: printableNodes,
        printableEdges: printableEdges,
      });
    }
  }

  render() {
    return (
      <svg className="image">
        {this.state.printableEdges}
        {this.state.printableNodes}
      </svg>
    );
  }
}

export default Canvas;