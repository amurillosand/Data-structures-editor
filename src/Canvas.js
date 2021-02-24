import React from "react";
import Node from "./Node";
import { Edge } from "./Edge";
import { getRandom } from "./Stuff";
import PrettyTree from "./PrettyTree";

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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      console.log("Prev props", prevProps);
      console.log("this.props", this.props);
      this.setState((prevState) => {
        console.log("Prev state", prevState);
        const nodesInfo = []
        for (const [curNode, info] of this.props.nodes) {
          if (prevProps.nodes.has(curNode)) {
            // node in common with the previous version
            let prevNode = prevState.nodesInfo.find(node => {
              return node.id === curNode;
            });
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

        console.log("Nodes info", nodesInfo);
        if (this.props.asATree) {
          let pretty = new PrettyTree(nodesInfo, this.props.edges);
          pretty.buildTree();
          console.log("Nodes info 2", nodesInfo);
        }

        const printableNodes = nodesInfo.map((node) => {
          console.log("Cur node", node);
          
          return (
            <Node
              key={node.id}
              id={node.id}
              x={node.x} y={node.y}
              color={node.color}
              label={node.label}
              updatePosition={this.updatePosition} />
          );
        })  
        
        console.log("\n");

        return {
          nodesInfo: nodesInfo,
          printableNodes: printableNodes
        }
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