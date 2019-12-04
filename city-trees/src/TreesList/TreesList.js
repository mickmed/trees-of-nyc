import React from "react";
import Tree from "./Tree";
// import Filters from "../Filters/Filters";

class TreesList extends React.Component {
  constructor() {
    super();
    this.state = {
      trees: []
    };
  }
  hoods = (neighbs) => {
    let result = { };
    for(let i = 0; i < neighbs.length; ++i) {
      if(!result[neighbs[i]])
          result[neighbs[i]] = 0;
          ++result[neighbs[i]];
    }
    return result
  }
  render() {
    const trees = (
      <div className="tree-list">
        {this.props.treesData.map((tree, index) => {
          // console.log(tree.nta_name)
          return <Tree key={index} trees={tree} />;
        })}
      </div>
    );
    
    // console.log(this.props.treesData)

    const neighbs = this.props.treesData.map(hood=>hood.nta_name)
    // const species = this.props.treesData.map(hood=>hood.spc_common)
    // const hds = this.hoods(neighbs)
    // console.log([this.hoods(neighbs)])
    const hoods = [this.hoods(neighbs)].map((hood,i)=>(
      <ul key={i}>
        {Object.keys(hood).map((key)=>{
          return (
            <li key={key+i}>{key}:{hood[key]}</li>
          )
        })}
      </ul>
    )
  )

      // {attributes.map((items, index) => {
      //   return (
      //     <ul key={index}>
      //     {Object.keys(items).map((key) => {
      //       return (
      //         <li key={key + index}>{key}:{items[key]}</li>
      //       )
      //     })}
      //     </ul>
      //   )
      // })}
    // console.log(result)
    // neighbs.forEach((obj, index)=> 
    //   console.log(Object.entries(obj).flat())
    // )
    return (
     
        <div className="tree-inner">
        {hoods}
        {trees}
        {this.props.treesData.length}
        </div>
    
    );
  }
}

export default TreesList;
