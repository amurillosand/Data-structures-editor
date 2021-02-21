import React, { Component } from "react";
import { getRandom } from "./Stuff";
import Node from "./Node";
import { Edge } from "./Edge";

import "./styles.css"

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodesInfo: [],
      printableNodes: [],
    };
  }

  updatePosition = (text, x, y) => {
    const nodesInfo = this.state.nodesInfo.map((node) => {
      if (node.text === text) {
        node.x = x;
        node.y = y;
      }
      return node;
    });

    this.setState({
      nodesInfo: nodesInfo
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      var nodesInfo = []
      for (var [nodeText, color] of this.props.nodesColor) {
        if (prevProps.nodesColor.has(nodeText)) {
          // node in common with the previous version
          var prevNode = this.state.nodesInfo.find(node => {
            return node.text === nodeText;
          });
          // just update the color
          prevNode.color = color;
          nodesInfo.push(prevNode);
        } else {
          // create a completely new node
          nodesInfo.push({ 
            x: getRandom(25, 800), 
            y: getRandom(25, 600), 
            color: color, 
            text: nodeText 
          });
        }
      }
      
      // Create nodes to be printed
      const printableNodes = nodesInfo.map(node => {
        return (
          <Node
            key={node.text}
            x={node.x} y={node.y}
            color={node.color}
            text={node.text}
            updatePosition={this.updatePosition} />
        );
      });

      this.setState({
        nodesInfo: nodesInfo,
        printableNodes: printableNodes
      });
    } 
  }

  render() {
    return (
      <svg className="image">
        {
          this.props.edgesSet.map((edge) => {
            console.log(edge);
            const from = this.state.nodesInfo.find(node => {
              return node.text === edge.from;
            });
            const to = this.state.nodesInfo.find(node => {
              return node.text === edge.to;
            });
      
            return <Edge from={from} to={to} text={edge.weight} />;
          })
        }

        {this.state.printableNodes}
      </svg>
    );
  }
}

export default Canvas;