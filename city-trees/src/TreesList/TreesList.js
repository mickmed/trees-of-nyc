import React from "react"
import Tree from "./Tree"
import { Icon, InlineIcon } from "@iconify/react"
import streetsignIcon from "@iconify/icons-et/streetsign"

import roundBorderOuter from "@iconify/icons-ic/round-border-outer"
import science from "@iconify/icons-uil/science"
import labelIcon from "@iconify/icons-zmdi/label"
import zipIcon from "@iconify/icons-whh/zip"
import fileZip from "@iconify/icons-octicon/file-zip"

// import Filters from "../Filters/Filters";
// import { geoloated } from "../App/Geolocated";

class TreesList extends React.Component {
  constructor() {
    super()
    this.state = {
      trees: []
    }
  }
  componentDidMount() {
    // this.getLocation()
  }
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition)
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  showPosition = position => {
    console.log(
      position.coords.latitude.toString() + position.coords.longitude.toString()
    )
  }

  hoods = neighbs => {
    let result = {}
    for (let i = 0; i < neighbs.length; ++i) {
      if (!result[neighbs[i]]) result[neighbs[i]] = 0
      ++result[neighbs[i]]
    }
    return result
  }

  capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // matches = () => {
  //   const stuff = {};
  //   const streetTypes = [
  //     "STREET",
  //     "AVENUE",
  //     "ROAD",
  //     "HIGHWAY",
  //     "PARKWAY",
  //     "BOULEVARD",
  //     "TURNPIKE",
  //     "PLACE",
  //     "DRIVE",
  //     "LOOP",
  //     "LANE",
  //     "CIRCLE",
  //     "PARK",
  //     "COURT"
  //   ];

  //   const srch = this.props.searchString;
  //   srch &&
  //     this.props.treesData.map((obj, i) => {
  //       // console.log(Object.values(obj), srch);
  //       Object.entries(obj).forEach(str => {
  //         // str.includes(this.props.searchString) && console.log("yes")

  //         if (typeof str[1] === "string") {
  //           // console.log('obj', obj);
  //           if (
  //             str[1].includes(srch) ||
  //             str[1].includes(srch.toLowerCase()) ||
  //             str[1].includes(srch.toUpperCase()) ||
  //             str[1].includes(this.capitalize(srch))
  //           ) {
  //             let splitRes = str[1].split(" ");
  //             if (str[0] === "address") {
  //               if (srch.match(/^\d/)) {
  //                 if (
  //                   srch.indexOf(" ") !== -1 &&
  //                   srch[srch.indexOf(" ") + 1] !== "undefined"
  //                 ) {
  //                   // console.log("number with space ");

  //                   if (!stuff[str[0]]) {
  //                     stuff[str[0]] = [];
  //                   }
  //                   !stuff[str[0]].includes(str[1]) &&
  //                     stuff[str[0]].push(str[1]);
  //                 }
  //               } else {
  //                 // console.log("not number");

  //                 str[1] = str[1].slice(str[1].indexOf(" ")); //chop number of address

  //                 if (!stuff[str[0]]) {
  //                   stuff[str[0]] = [];
  //                 }
  //                 !stuff[str[0]].includes(str[1]) &&
  //                   stuff[str[0]].unshift(str[1]);
  //               }
  //             } else {
  //               if (
  //                 str[0] !== "latitude" &&
  //                 str[0] !== "longitude" &&
  //                 str[0] !== "x_sp" &&
  //                 str[0] !== "y_sp" &&
  //                 str[0] !== "block_id" &&
  //                 str[0] !== "boro_ct"
  //               ) {
  //                 const atts = [
  //                   "zipcode",
  //                   "tree_id",
  //                   "health",
  //                   "spc_latin",
  //                   "spc_common",
  //                   "zip_city",
  //                   "boroname",
  //                   "nta_name"
  //                 ];
  //                 atts.forEach(att => {
  //                   if (att === str[0]) {
  //                     // console.log('here', str[0], str[1], att)
  //                     if (!stuff[att]) {
  //                       stuff[att] = [];
  //                     }
  //                     // console.log('assafd', str[1])
  //                     !stuff[str[0]].includes(str[1]) &&
  //                       stuff[att].push(str[1]);
  //                   }
  //                 });
  //               }
  //             }
  //           }
  //         }
  //       });
  //     });
  //   console.log("stuff", stuff);
  //   return stuff;
  // };
  // renderMatches = () => {
  //   const matchesList = this.matches();

  //   let keys = Object.keys(matchesList);
  //   return keys.map(key => {
  //     return (
  //       <div>
  //         <div className="list-subtitle">{key}</div>
  //         {matchesList[key]
  //           .sort()
  //           .slice(0, 15)
  //           .map(match => {
  //             return <div>{match}</div>;
  //           })}
  //       </div>
  //     );
  //   });

  //   // for (let ls of matchesList){
  //   //   console.log("list", matchesList[ls], ls);

  //   // }
  //   // for (let list in matchesList) {
  //   //   console.log("list", matchesList[list], list);
  //   //   return matchesList[list].map(match=>{
  //   //     return <div>{match}</div>
  //   //   })
  //   // }
  // };

  // makeUnique = (arr) => {
  //   console.log(arr)
  //   arr.forEach(obj => {
  //     console.log(obj)
  //     for(let ar in obj){
  //       console.log(ar, obj[ar])
  //       // ar[i].forEach()

  //     }
  //   })

  // }

  // renderPatches = () => {
  //   function compare(a, b) {
  //     // Use toUpperCase() to ignore character casing
  //     // const bandA = a.band.toUpperCase();
  //     // const bandB = b.band.toUpperCase();

  //     let comparison = 0;
  //     if (a.address > b.address) {
  //       comparison = 1;
  //     } else if (a.address < b.address) {
  //       comparison = -1;
  //     }
  //     return comparison;
  //   }
  renderFiltered = () => {
   
    const filtered = this.props.filtered && this.props.filtered
    if (this.props.filtered) {
      return Object.keys(filtered).map(key => {
        return (
          <div>
            <div>{key}</div>
            {filtered[key] .sort() .slice(0, 5)}
          </div>
        )
      })
    }

    // this.props.filtered &&
    // this.props.filtered.map(match => {
    //   const blackList = [
    //     "latitude",
    //     "longitude",
    //     "x_sp",
    //     "y_sp",
    //     "block_id",
    //     "boro_ct"
    //   ]

    // let icon, subtitle
    // if (Object.keys(match)[0] === "address") {
    //   icon = <Icon icon={streetsignIcon} />
    //   subtitle = "Addresses"
    // }
    // if (Object.keys(match)[0] === "nta_name") {
    //   icon = <Icon icon={roundBorderOuter} />
    //   subtitle = "Neighborhood"
    // }
    // if (Object.keys(match)[0] === "spc_common") {
    //   icon = <Icon icon={labelIcon} />
    //   subtitle = "Common Species"
    // }
    // if (Object.keys(match)[0] === "spc_latin") {
    //   icon = <Icon icon={labelIcon} color="darkgrey" />
    //   subtitle = "Latin Species"
    // }
    // if (Object.keys(match)[0] === "zipcode") {
    //   icon = <Icon icon={fileZip} color="lightgrey" />
    //   subtitle = "ZipCode"
    // }
    //   console.log(Object.keys(match))
    //   if (!blackList.includes(Object.keys(match)[0])) {
    //     return (
    //       <div className="search-subtitles">
    //         hi
    //         {/* {icon} {subtitle}
    //         {match[Object.keys(match)[0]]
    //           .sort(this.compare)
    //           .slice(0, 5)

    //           .map(mat => (
    //             console.log(mat)

    //             <div className="search-results">
    //               {mat[Object.keys(match)[0]]}
    //             </div>
    //           ))} */}
    //       </div>
    //     )
    //   }
    // })
    // )
  }

  renderTrees = () => {
    const sorted = this.props.filtered && this.props.filtered.sort(this.compare)
    // console.log(sorted)
    return (
      sorted &&
      sorted.map(fil => {
        return <div>{fil.address}</div>
      })
    )
  }
  render() {
    // console.log(this.props.filtered)

    // this.renderTrees()
    // this.props.filtered && this.makeUnique(this.props.filtered)
    // console.log(this.props.filtered)
    // this.props.filtered && this.props.filtered.map(tree=>{
    //   console.log(tree.address && tree.address.address)
    // })
    // let blah = 'blpatah'
    // blah.forEach(b=>{
    //   console.log(Object.keys(b))
    // })

    // console.log(Object.keys(blah))
    // blah = blah.map(tree => {
    //   return <div>{tree.address}</div>
    // })
    // const matchesList = this.renderMatches();
    // console.log("matchesList", matchesList);

    // console.log('stuffaddress', stuff.address)
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
    // const hds = this.hoods(neighbs)<div onClick={()=>this.props.handleClickSearch(match)}>

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

    // let addressMatches = matchesList && matchesList[0].map(match=>{
    //   return <div>{match.address}</div>
    // })
    // const results = this.matches().map(match=>

    //   )
    return (
      <div className="tree-inner">
        {/* {blah} */}
        {this.renderFiltered()}
        {"faroute"}
        {/* {this.renderTrees()} */}

        {/* {this.matches().sort()} */}
        {/* {addresses.map(match=>(
            <div onClick={()=>this.props.handleClickSearch(match)}>
          {match.address}
          </div>
       ))} */}
        {/* {addressMatches} */}

        {/* <geolocated/> */}
        {/* {hoods} */}
        {/* {matches.map(match=><div>{match}</div>)} */}
        {/* {trees} */}
        {/* {this.props.treesData.length} */}
      </div>
    )
  }
}

export default TreesList
// console.log("here", splitRes[1]);

// if (
//   str[1].includes("STREET") ||
//   str[1].includes("AVENUE") ||
//   str[1].includes("ROAD") ||
//   str[1].includes("HIGHWAY") ||
//   str[1].includes("PARKWAY") ||
//   str[1].includes("BOULEVARD") ||
//   str[1].includes("TURNPIKE") ||
//   str[1].includes("PLACE") ||
//   str[1].includes("DRIVE") ||
//   str[1].includes("LOOP") ||
//   str[1].includes("LANE") ||
//   str[1].includes("CIRCLE") ||
//   str[1].includes("PARK") ||
//   str[1].includes("COURT")
// )
