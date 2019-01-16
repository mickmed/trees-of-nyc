import React from "react";
import Tree from "./Tree";
const boros = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']

const TreesList = props => {
  console.log(props)
  const trees = (
    <div>
      {props.treesData && props.treesData.map((tree, index) => (
        <Tree key={index} address={tree.address} />
      ))}
    </div>
  )
  const boroslist = (
    <div>
      {boros.map((el,id) => (
        //  console.log(el)
        <button key={id} onClick={props.fltrClk} value={'boroname=' + el}>{el}</button>
      ))}
    </div>
  )

  return (
    
  <div>
    {boroslist}
    {trees}
  
  </div>
  )
};

export default TreesList;