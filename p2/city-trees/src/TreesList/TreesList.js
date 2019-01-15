import React from "react";
import Tree from "./Tree";

const TreesList = props => {
  console.log(props)
  const trees = (
    <div>
      {props.treesData && props.treesData.map((tree, index) => (
        // console.log(tree.address)
        <Tree key={index} address={tree.address} />
        
      ))}
      // {/* null */}
   </div>
  );

  return (
  <div>
  {trees}
  </div>
  )
};

export default TreesList;