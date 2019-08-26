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
      <div className="tree-list">
        {this.props.treesData.map((tree, index) => {
          return <Tree key={index} trees={tree} />;
        })}
      </div>
    );

    return (
     
        <div className="tree-inner">{trees}</div>
    
    );
  }
}

export default TreesList;
