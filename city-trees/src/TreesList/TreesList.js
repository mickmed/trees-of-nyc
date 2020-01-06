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



  renderFiltered = () => {
  // console.log(this.props.searchInfo && this.props.searchInfo)
    const filtered = this.props.searchInfo && this.props.searchInfo
    const data = filtered[Object.keys(filtered)[0]]
    // console.log(data && data.length)
    if (filtered && data) {

      return (
        <div className='srch-result'>
          {Object.keys(filtered)[0]} '{this.props.searchString}' <span>({data.length})</span>


        </div>
      )

    }
  }

  renderSpecies = () => {

    const filtered = this.props.searchInfo && this.props.searchInfo

    let counts = {}
    if (Object.keys(filtered).length !== 0) {
      const b = filtered[Object.keys(filtered)[0]].forEach(e => {
        // console.log(e.spc_common)
        counts[e.spc_common] = (counts[e.spc_common] + 1) || 1
        //  return e.spc_common
      })
      // console.log('counts', counts)

    }

    return <div className="species-list">
      {Object.keys(counts).map(e => {
        // console.log(e)
        return  <div className="species">{e} <span>({counts[e]})</span> </div>
      })}
    </div>



  }


  render() {

    return (
      <div className="tree-inner">
        {this.renderFiltered()}

        {this.renderSpecies()}

      </div>
    )
  }
}

export default TreesList

