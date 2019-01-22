import React from "react";
import Tree from "./Tree";

class TreesList extends React.Component {
  constructor() {
    super();
    this.state = {
      trees: []
    };
  }

  render() {
    const trees = (
      <div>
        {this.props.treesData.map((tree, index) => {
          return <Tree key={index} trees={tree} />;
        })}
      </div>
    );

    return (
      <div>
        <div className="tree-inner">{trees}</div>
      </div>
    );
  }
}

export default TreesList;
