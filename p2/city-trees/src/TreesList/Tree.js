import React from "react";

const Tree = props => {

  return (
    <div className="tree">
      <div className="tree-info">
        <h5>{props.trees.address}&nbsp;&nbsp;</h5>
        <h5>~ {props.trees.nta_name}</h5>
      </div>
      <div className="tree-status">
        <p>SPECIES: <i>{props.trees.spc_common}</i></p>
        <p>STATUS: <i>{props.trees.status}</i></p>
      </div>

      <hr />
    </div>
  );
};

export default Tree;
