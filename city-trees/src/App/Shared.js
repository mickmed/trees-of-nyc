
import React from "react";
import { Icon, InlineIcon } from "@iconify/react"
import streetsignIcon from "@iconify/icons-et/streetsign"
import roundBorderOuter from "@iconify/icons-ic/round-border-outer"
import science from "@iconify/icons-uil/science"
import labelIcon from "@iconify/icons-zmdi/label"
import zipIcon from "@iconify/icons-whh/zip"
import fileZip from "@iconify/icons-octicon/file-zip"


export const capitalize = s => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const blackList = () => {
  return [
    "latitude",
    "longitude",
    "x_sp",
    "y_sp",
    "block_id",
    "boro_ct",
    "problems",
    "zip_city"
  ]
}

export const whiteList = () => {
  return [
    ""
  ]
}
export const filterData = (srch, trees) => {

console.log(trees)
  const arr = []
  const arr2 = []
  trees && trees.map((obj, i) => {
    Object.entries(obj).map((str, index) => {
      if (typeof str[1] === "string" && !blackList().includes(str[0])) {
        if (
          str[1].includes(srch) ||
          str[1].includes(srch.toLowerCase()) ||
          str[1].includes(srch.toUpperCase()) ||
          str[1].includes(capitalize(srch))
        ) {
          if (!arr.includes(str[0])) {
            arr.push(str[0])
            arr2.push({ [str[0]]: [str[1]] })

          }
          arr2.forEach(e => Object.keys(e)[0] === str[0]
            && !e[str[0]].includes(str[1])
            && e[str[0]].length < 5
            && e[str[0]].push(str[1])
          )
        }
      }
    })
  })
  // console.log(arr2)
  return arr2
}

export const typeConverter = (type) => {
  // console.log(type)

  let icon, color
  if(type === 'spc_common'){
    type = 'common name'
    icon = labelIcon
    color = 'green'
  }else if(type === 'spc_latin'){
    type = 'latin name'
    icon = labelIcon
    color = 'grey'
  }else if(type === 'zipcode'){
    type = 'zipcode'
    icon = zipIcon
    color = 'red'
  }else if(type === 'nta_name'){
    type = 'neighborhood'
    icon = roundBorderOuter
    color = 'blue'
  }else if(type === 'address'){
    type = 'address'
    icon = streetsignIcon
    color = 'blue'
  }
  return [<Icon icon={icon} style={{color:color}}/>, type] 

}





// fetchData = async (url, param) => {
//   let urlStr
//   if (param) {
//     urlStr = url + param
//   } else {
//     urlStr =
//       url +
//       this.state.boroname +
//       this.state.zipcode +
//       this.state.status +
//       this.state.spc_common
//   }

//   await axios

//     .get(urlStr)
//     .then(response => {
//       const trees = response.data
//       this.setState({
//         trees: trees
//       })
//     })
//     .catch(error => {
//       console.error("Error: ", error)
//     })
// }

// boroClk = e => {
//   let boroname = "&boroname=" + e.target.value
//   this.setState({ boroname: boroname })

//   let str =
//     boroname + this.state.spc_common + this.state.status + this.state.health
//   this.fetchData(TREES_URL, str)
// }

// zipChng = e => {
//   //chk for empty zip
//   let zip
//   e.target.value === "" ? (zip = "") : (zip = "&zipcode=" + e.target.value)
//   this.setState({ zipcode: "&zipcode=" + e.target.value })

//   //chk for empty species
//   let spec
//   this.state.spc_common === "" ? (spec = "") : (spec = this.state.spc_common)
//   this.setState({ zipcode: "&zipcode=" + e.target.value })

//   //set url parameters
//   let str =
//     this.state.boroname + zip + spec + this.state.status + this.state.health
//   this.fetchData(TREES_URL, str)
// }

// speciesChng = e => {
//   //chk for empty species
//   let specs
//   e.target.value === ""
//     ? (specs = "")
//     : (specs = "&spc_common=" + e.target.value)

//   //chk for empty zip
//   let zips
//   this.state.zipcode === "" ? (zips = "") : (zips = this.state.zipcode)
//   this.setState({ spc_common: "&spc_common=" + e.target.value })

//   //set url parameters
//   let str =
//     this.state.boroname + zips + specs + this.state.status + this.state.health
//   this.fetchData(TREES_URL, str)
// }

// sttsClk = e => {
//   this.setState({ status: e.target.value })
//   let str =
//     this.state.boroname +
//     this.state.zipcode +
//     this.state.spc_common +
//     e.target.value
//   this.fetchData(TREES_URL, str)
// }

// hlthClk = e => {
//   this.setState({ health: e.target.value })
//   let str =
//     this.state.boroname +
//     this.state.zipcode +
//     this.state.spc_common +
//     this.state.status +
//     e.target.value
//   this.fetchData(TREES_URL, str)
// }