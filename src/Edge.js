import React from "react"

class Edge extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (this.props != prevProps) {
      console.log("One node moves");


    }
  }

  render() {
    console.log(this.props);

    // console.log("Edge", from, " -> ", to);

    // return <line 
    //   x1={from.props.x} y1={from.props.y} 
    //   x2={to.props.x} y2={to.props.y} 
    //   stroke="black" />

    return <h1>hi</h1>
  }
}

export default Edge;