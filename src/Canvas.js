import React from "react";
import Node from "./Node";
import { Edge, Loop } from "./Edge";
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
    let count = new Map();

    function getKey(from, to) {
      if (from > to) {
        [from, to] = [to, from]
      }

      return JSON.stringify({
        from, to
      });
    }
    
    return (
      <div className="scrollable-image">
        <svg className="image">
          {
            this.props.edges.sort((a, b) => {
              return getKey(a[0].from, a[0].to) < getKey(b[0].from, b[0].to) ? -1 : +1;
            }).map((edge) => {
              const from = this.state.nodesInfo.find(node => {
                return edge[0].from === node.id;
              });
              const to = this.state.nodesInfo.find(node => {
                return edge[0].to === node.id;
              });
        
              const edgeToString = getKey(edge[0].from, edge[0].to);
              if (!count.has(edgeToString)) {
                count.set(edgeToString, 0);
              }
        
              let delta = count.get(edgeToString);
              let side = delta % 2 ? +1 : -1;
              count.set(edgeToString, delta + 1);

              if (edge[0].from > edge[0].to) {
                side *= -1;
              }
        
              return ({
                from: from,
                to: to,
                weight: edge[1].weight,
                color: edge[1].color,
                delta: side * 40 * Math.ceil(delta / 2)
              })
            }).map((edge, key) => {
        
              if (edge.from === edge.to) {
                return (
                  <Loop
                    key={key}
                    from={edge.from}
                    to={edge.to}
                    weight={edge.weight}
                    color={edge.color}
                    directed={this.props.directed} />
                );
              } else {
                return (
                  <Edge
                    delta={edge.delta}
                    key={key}
                    from={edge.from}
                    to={edge.to}
                    weight={edge.weight}
                    color={edge.color}
                    directed={this.props.directed} />
                );
              }
            })
          }

          {this.state.printableNodes}

        </svg>
      </div>
    );
  }
}

export default Canvas;