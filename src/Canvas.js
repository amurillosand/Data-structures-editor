import React from "react";
import Node from "./Node";
import { Edge } from "./Edge";
import { getRandom } from "./Stuff";
import { prettyTree } from "./PrettyTree";

import "./styles.css"

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodesInfo: [],
      printableNodes: []
    };
  }

  updatePosition = (id, x, y) => {
    const nodesInfo = this.state.nodesInfo.map((node) => {
      if (node.id === id) {
        node.x = x;
        node.y = y;
      }
      return node;
    });

    this.setState({
      nodesInfo: nodesInfo
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      let nodesInfo = []
      for (const [curNode, info] of this.props.nodes) {
        let prevNode = prevState.nodesInfo.find(node => {
          return node.id === curNode;
        });
        if (prevNode !== undefined) {
          // just update the color
          prevNode.color = info.color;
          prevNode.label = info.label;
          nodesInfo.push(prevNode);
        } else {
          // create a completely new node
          nodesInfo.push({
            id: curNode,
            x: getRandom(25, 800),
            y: getRandom(25, 600),
            color: info.color,
            label: info.label,
          });
        }
      }
      
      prettyTree({
        drawGraph: this.props.drawGraph,
        likeTree: this.props.likeTree,
        nodes: nodesInfo, 
        edges: this.props.edges
      }, () => {
        let printableNodes = nodesInfo.map((node) => {
          return (
            <Node
              key={node.id}
              id={node.id}
              x={node.x} y={node.y}
              color={node.color}
              label={node.label}
              updatePosition={this.updatePosition} />
          );
        });

        console.log("\n\n");
      
        this.setState({
          nodesInfo: nodesInfo,
          printableNodes: printableNodes
        });
      });
    }
  }
  
  render() {
    return (
      <svg className="image">
        {
          this.props.edges.map((edge, key) => {
            const from = this.state.nodesInfo.find(node => {
              return edge[0].from === node.id;
            });
            const to = this.state.nodesInfo.find(node => {
              return edge[0].to === node.id;
            });

            return (
              <Edge
                key={key}
                from={from} to={to}
                weight={edge[1].weight}
                color={edge[1].color}
                directed={this.props.directed} />
            );
          })
        }
        
        {this.state.printableNodes}
      </svg>
    );
  }
}

export default Canvas;