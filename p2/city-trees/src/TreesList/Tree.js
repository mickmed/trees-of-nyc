import React from "react";

const Tree = props => {
  // console.log(props.trees)
  return (
    <div className="tree">
      <h5>{props.trees.address}</h5>
      <h5>{props.trees.nta_name}</h5>
      <p>species:{props.trees.spc_common}</p>
      <p>status:{props.trees.status}</p>


      <hr></hr>
    </div>
  );
};

export default Tree;
