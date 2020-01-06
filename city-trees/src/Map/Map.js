import React, { Component } from "react"
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl"
// import TreePin from "./tree-pin.js";
// import TreeInfo from "./TreeInfo";
// import ControlPanel from "./control-panel.js";
import "./Map.css"
import { blackList } from '../App/Shared'

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWlja21lZCIsImEiOiJjanFzdTVtZjEwMnY0NDJzM2g4MXNuNTM0In0.VDbqZxEh0hxXAixRjS9FzA"
// const h = window.innerHeight
// console.log(h)
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
}

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // trees: [],
      // boroname: "&boroname=Manhattan",
      // zipcode: "",
      // spc_common: "",
      // status: "&status=Alive",
      // health: "",

      viewport: {
        // width: window.innerWidth/2,
        width: 500,

        // height: window.innerHeight/1.5,
        height: 600,

        latitude: 0,
        longitude: 0,
        zoom: 13,
        treesize: '1em'
      }
      // lat: 0,
      // long: 0,
      // info: null,
      // popupInfo: null,
      // tree: null
    }

    // this._renderMarker = this._renderMarker.bind(this);
    // this._renderPopup = this._renderPopup.bind(this);
  }
  componentDidMount() {
    //   // const AppDims = document.querySelector(".App")
    //   // console.log(AppDims)
    //   // if (AppDims.offsetWidth < 900 && AppDims.offsetWidth < AppDims.offsetHeight) {
    //   //   this.setState({
    //   //     viewport: {
    //   //       ...this.state.viewport,
    //   //       width: '100%',
    //   //       // height: AppDims.offsetHeight / 2 + 'px',
    //   //       appDims: AppDims,
    //   //     }
    //   //   })
    //   // }
    //   // else {
    //   //   this.setState({
    //   //     viewport: {
    //   //       ...this.state.viewport,
    //   //       width: '100%',
    //   //       // height: AppDims.offsetHeight / 1 + 'px',
    //   //       appDims: AppDims,
    //   //     }
    //   //   })
    //   // }
    window.addEventListener("resize", this._resize)
    this._resize()
  }

  //this updates the initial state of viewport (latitude and longitude) so that when the page loads the map centers on the first tree in the array.
  //   https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
  componentWillReceiveProps = props => {
    // console.log('willrecprops', props.filteredMap[0])
    // console.log('willrecprops', props.filteredMap && props.filteredMap[Object.keys(props.filteredMap)[0]])
    let trees = props.filteredMap
    // console.log(trees)
    // if (props.filteredMap && props.filteredMap[Object.keys(props.filteredMap)[0]]) {
    if (trees && trees[0]) {
      // console.log(props.filteredMap[0])
      // let zoom = props.filteredMap[Object.keys(props.filteredMap)[0]].length < 20 ?
      let zoom = trees.length < 20 ? 16 : 12
      let treesize = trees.length < 20 ? '2em' : '.1em'
      // let treesize 
      // console.log(trees.length)
      if(trees.length < 14){
        // console.log('<14')
        treesize = '.5em'
      }else if(trees.length < 17 && trees.length >= 14){
        // console.log('middle')
        treesize = '1em'
      }else if(trees.length < 20 && trees.length >= 17) {
        // console.log('tops')
        treesize = '2em'
      }
      

      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          // longitude: parseFloat(props.filteredMap[Object.keys(props.filteredMap)[0]][0].longitude),
          // latitude: parseFloat(props.filteredMap[Object.keys(props.filteredMap)[0]][0].latitude),
          longitude: parseFloat(props.filteredMap[0].longitude),
          latitude: parseFloat(props.filteredMap[0].latitude),
          zoom: zoom,
          treesize: treesize
        }
      }))
    }
  }

  _resize = () => {
    const AppDims = document.querySelector(".mapWrapper")
    console.log(this.state.treesize)
    this._onViewportChange({
      width: AppDims.offsetWidth,
      height: AppDims.offsetHeight
    })
  }
  _updateViewport = viewport => {
    this.setState({ viewport })
  }
  _onViewportChange = viewport => {
    console.log(this.state.viewport.zoom)
    let zoom = this.state.viewport.zoom
    let treesize = ''
     this.setState({

      viewport: { ...this.state.viewport, ...viewport }
    })
    // if (this.state.viewport.zoom < 16) {
      

    //   this.setState(prevState => ({
    //     viewport: {
    //       ...prevState.viewport, treesize: '.1em'
    //     }
    //   }))

    // } else {
    //   this.setState(prevState => ({
    //     viewport: {
    //       ...prevState.viewport, treesize: '2em'
    //     }
    //   }))
    // }
console.log(zoom)

    if(zoom < 14){
      console.log('<14')
      treesize = '.5em'
    }else if(zoom < 18 && zoom >= 14){
      console.log('middle')
      treesize = '1em'
    }else if(zoom >= 18) {
      console.log('tops')
      treesize = '2em'
    }

    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport, treesize: treesize
      }
    }))
   

    
  }
  _renderMarker = (tree, index) => {
    // console.log(tree)
    return (
      <Marker
        key={index}
        longitude={parseFloat(tree.longitude)}
        latitude={parseFloat(tree.latitude)}
      >
        <div
          className="treepin"
          onClick={() =>
            this.setState({
              tree: tree
            })
          }
        >
          {tree.status === "Alive" && (
            <p style={{ fontSize: this.state.viewport.treesize }}>{`\u{1F333}`}</p>
          )}

          {tree.status === "Stump" && (
            <p className="tree-stmp" title={`\u{1F96B}`}>{`\u{1F96B}`}</p>
          )}

          {tree.status === "Dead" && (
            <p className="tree-dead" title={`\u{1F334}`}>{`\u{1F334}`}</p>
          )}
        </div>
        {/* <TreePin
          size={20}
          onClick={() =>
            this.setState({
              const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
              tree: tree
            })
          }
        /> */}
      </Marker>
    )
  }

  // _renderPopup(map) {
  //   const { tree } = this.state;

  //   return (

  //     tree && (
  //       <Popup
  //         tipSize={50}
  //         offsetLeft={12}
  //         offsetTop={15}
  //         longitude={parseFloat(tree.longitude)}
  //         latitude={parseFloat(tree.latitude)}
  //         closeOnClick={false}
  //         onClose={() => this.setState({ tree: null })}
  //       >
  //         <TreeInfo info={tree} />

  //       </Popup>
  //     )
  //   );
  // }
  compare = (a, b, key) => {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.band.toUpperCase();
    // const bandB = b.band.toUpperCase();

    let comparison = 0
    if (a.address > b.address) {
      comparison = 1
    } else if (a.address < b.address) {
      comparison = -1
    }
    return comparison
  }
  render() {
    const { viewport } = this.state
    const { filteredMap } = this.props
    // const TREES = this.props.treesData && this.props.treesData
    // console.log('propsfil', filteredMap && filteredMap)
    // console.log(viewport)

    // let filKeys = filteredMap && Object.keys(filteredMap) && Object.keys(filteredMap).filter(
    //   e => !blackList().includes(e)
    // )
    // filKeys && filKeys.reverse()
    // console.log(filKeys)
    // const filt =
    //   filteredMap &&
    //   (filKeys).map(key => {
    //     console.log(key)
    //     return filteredMap[key]
    //   }).slice(0, 250)


    return (
      <ReactMapGL
        className="map"
        width={viewport.width}
        height={viewport.height}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={this._updateViewport}
        // onViewportChange={this.props.vpc(viewport.zoom)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {/* <div onLoad={this.hello} /> */}
        {/* {this.state.tree && this.state.tree.latitude} */}
        {filteredMap && filteredMap.map(this._renderMarker)}

        {/* {this._renderPopup()} */}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._onViewportChange} />
        </div>
      </ReactMapGL>
    )
  }
}

export default Map
