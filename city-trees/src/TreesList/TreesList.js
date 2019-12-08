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
  hoods = neighbs => {
    let result = {};
    for (let i = 0; i < neighbs.length; ++i) {
      if (!result[neighbs[i]]) result[neighbs[i]] = 0;
      ++result[neighbs[i]];
    }
    return result;
  };
  capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  matches = () => {
    const strngs = [];
    const srch = this.props.searchString;
    srch &&
      this.props.treesData.map((obj, i) => {
        // console.log(Object.values(obj), srch);
        Object.entries(obj).forEach(str => {
          // str.includes(this.props.searchString) && console.log("yes")

          if (typeof str[1] === "string") {
            // console.log(str);
            if (
              str[1].includes(srch) ||
              str[1].includes(srch.toLowerCase()) ||
              str[1].includes(srch.toUpperCase()) ||
              str[1].includes(this.capitalize(srch))
            ) {
              if (
                str[1].includes("STREET") ||
                str[1].includes("AVENUE") ||
                str[1].includes("ROAD") ||
                str[1].includes("PARKWAY") ||
                str[1].includes("BOULEVARD") ||
                str[1].includes("TURNPIKE") ||
                str[1].includes("PLACE") ||
                str[1].includes("DRIVE") ||
                str[1].includes("LOOP") ||
                str[1].includes("LANE") ||
                str[1].includes("CIRCLE") ||
                str[1].includes("PARK") ||
                str[1].includes("COURT")
              ) {
                if (srch.match(/^\d/)) {
                  console.log("number", srch);
                  console.log(srch.indexOf(" "));
                  console.log(srch[srch.indexOf(" ") + 1]);
                  if (
                    srch.indexOf(" ") !== -1 &&
                    srch[srch.indexOf(" ") + 1] !== "undefined"
                  ) {
                    console.log("number with space ");
                    !strngs.includes(str[1]) && strngs.unshift(str[1]);
                  }
                } else {
                  console.log("not number");
                  str[1] = str[1].slice(str[1].indexOf(" "));
                  !strngs.includes(str[1]) && strngs.unshift(str[1]);
                }
              } else {
                if (
                  str[0] !== "latitude" &&
                  str[0] !== "longitude" &&
                  str[0] !== "x_sp" &&
                  str[0] !== "y_sp" &&
                  str[0] !== "block_id" &&
                  str[0] !== "boro_ct"
                )
                  !strngs.includes(str[1]) && strngs.push(str[1]);
                // !strngs.includes(obj.spc_common) && strngs.push(obj.spc_common)
              }
            }
          }
        });
      });
    return strngs;
  };
  handleClick = () => {
    
  }
  render() {
    console.log(this.state.trees);
    // const trees = (
    //   <div className="tree-list">
    //     {this.props.treesData.map((tree, index) => {
    //       // console.log(tree.nta_name)
    //       return <Tree key={index} trees={tree} />;
    //     })}
    //   </div>
    // );

    // console.log(this.props.treesData)

    // const neighbs = this.props.treesData.map(hood => hood.nta_name);
    // const species = this.props.treesData.map(hood=>hood.spc_common)
    // const hds = this.hoods(neighbs)
    // console.log([this.hoods(neighbs)])
    // const hoods = [this.hoods(neighbs)].map((hood, i) => (
    //   <ul key={i}>
    //     {Object.keys(hood).map(key => {
    //       return (
    //         <li key={key + i}>
    //           {key}:{hood[key]}
    //         </li>
    //       );
    //     })}
    //   </ul>
    // ));

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
        {this.matches().map(match=>(
          <div onClick={this.handleClick}>{match}</div>
        ))}
        {/* {hoods} */}
        {/* {matches.map(match=><div>{match}</div>)} */}
        {/* {trees} */}
        {/* {this.props.treesData.length} */}
      </div>
    );
  }
}

export default TreesList;
