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
      trees: [],
      clicked: false
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



  // renderFiltered = () => {
  //   // console.log(this.props.searchInfo && this.props.searchInfo)
  //   const filtered = this.props.filteredMap && this.props.filteredMap
  //   console.log(filtered)
  //   const data = filtered && filtered[Object.keys(filtered)[0]]
  //   console.log(filtered)
  //   // console.log(data && data.length)
  //   if (filtered && data) {

  //     return (
  //       <div className='srch-result'>
  //         {Object.keys(filtered)[0]} '{this.props.searchString}' <span>({data.length})</span>


  //       </div>
  //     )

  //   }
  // }
  handleClick = (type) => {
    // console.log(typeConverter(type))
    // console.log(type, this.props)
    this.setState({
      clicked: !this.state.clicked,
      type: type

    })
  }

  filteredList = () => {
    console.log(this.props.filteredData)
     return this.props.filteredData && this.props.filteredData.map(e=>{
       console.log(e[Object.keys(e)[0]])
       
       return (
       <div style={{paddingBottom:'10%'} }>
         <div>{typeConverter(Object.keys(e)[0])}</div>
          {e[Object.keys(e)[0]].map(f=>{
            return <div onClick={()=>this.props.getSetSearch(f, Object.keys(e)[0])}>{f}</div>
          })}
         </div>
         )
     })
     
     
  }


  renderCategories = () => {
    
    let type = this.props.type &&
      (this.props.type === 'zipcode') ?
      ['address', 'spc_common', 'spc_latin', 'nta_name'] :
      (this.props.type === 'address') &&
      ['zipcode', 'spc_common', 'spc_latin', 'nta_name']
      console.log(type, this.props.filteredList)

    let data = type.map(type => {
      let counts = {}
      if (this.props.filteredList && this.props.filteredList.length !== 0) {
        this.props.filteredList.forEach(e => {
          counts[e[type]] = (counts[e[type]] + 1) || 1
        })
      }
      
      return <div style={{ paddingBottom: '10%' }} className="species-list" >

        <div
          style={{ marginBottom: '2%' }}
          onClick={() => this.handleClick(type)}>{typeConverter(type)}<span>({Object.keys(counts).length})</span>

        </div>
        <div style={{
          display: this.state.clicked ? 'block' : 'none',
          marginLeft: '10%',

          overflowY: 'scroll',
          maxHeight: '100px'

        }}
        >
          {Object.keys(counts).map(e => {
            // console.log(e, type, counts)
            if (this.state.type && this.state.type === type) {
              return (
                <div
                  style={{ marginRight: '10%', fontSize: '.85em', color: this.props.selected === e && 'red' }}
                  onClick={() => this.props.handleClick(type, e)}
                >{e}
                  <span style={{ color: this.props.selected === e && 'red' }}>({counts[e]})</span></div>
              )
            }
          })}
        </div>
      </div>
    })
    return (
      <>
        <div style={{ fontSize: '1.25em', marginBottom: '10%' }}>{this.props.type} <span style={{ fontStyle: 'italic' }}>'{this.props.value}'</span></div>
        <div style={{ height: '100%' }}>{data}</div>
      </>
    )
  }


  render() {
    const treesList = this.props.fromKey ? this.filteredList() : this.renderCategories()
    return (
      <div className="tree-inner">
        {/* {this.renderFiltered()} */}

        {treesList}

      </div>
    )
  }
}

export default TreesList

