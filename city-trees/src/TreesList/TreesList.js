import React from "react"
import Tree from "./Tree"


import roundBorderOuter from "@iconify/icons-ic/round-border-outer"
import science from "@iconify/icons-uil/science"
import labelIcon from "@iconify/icons-zmdi/label"
import zipIcon from "@iconify/icons-whh/zip"
import fileZip from "@iconify/icons-octicon/file-zip"

import { typeConverter } from '../App/Shared'


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
    const filtered = this.props.filteredMap && this.props.filteredMap
    console.log(filtered)
    const data = filtered && filtered[Object.keys(filtered)[0]]
    console.log(filtered)
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
    console.log(this.props.type, this.props.value)
    console.log(this.props.type, this.props.filteredMap && this.props.filteredMap)
    let type = this.props.type &&
      (this.props.type === 'address' || this.props.type === 'zipcode') &&
      ['spc_common', 'spc_latin', 'nta_name']
      // 'spc_common'

    console.log(type)



    const filtered = this.props.filteredMap && this.props.filteredMap
    console.log(filtered)

    let data = type.map(type => {


      let counts = {}


      if (filtered && filtered.length !== 0) {
        const b = filtered.forEach(e => {
          counts[e[type]] = (counts[e[type]] + 1) || 1

        })
      }

      return <div className="species-list" >
       
        <div style={{ marginBottom: '10%' }}>{typeConverter(type)}<span>({Object.keys(counts).length})</span>

        </div>
        {/* {Object.keys(counts).map(e => {
          console.log(e)
          return <div className="species">{e} <span>({counts[e]})</span></div>
        })} */}
      </div>
    })

    return (
      <>
       <div>{this.props.type}{this.props.value}</div>
      <div>{data}</div>
      </>
    )
  }


  render() {

    return (
      <div className="tree-inner">
        {/* {this.renderFiltered()} */}

        {this.renderSpecies()}

      </div>
    )
  }
}

export default TreesList

