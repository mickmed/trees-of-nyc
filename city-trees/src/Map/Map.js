import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
// import TreePin from "./tree-pin.js";
import TreeInfo from "./TreeInfo";
// import ControlPanel from "./control-panel.js";
import "./Map.css";


const MAPBOX_TOKEN = 'pk.eyJ1IjoibWlja21lZCIsImEiOiJjanFzdTVtZjEwMnY0NDJzM2g4MXNuNTM0In0.VDbqZxEh0hxXAixRjS9FzA'
// const h = window.innerHeight
// console.log(h)
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};



class Map extends Component {
  constructor(props) {
    super(props);

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
        height:600,
       

        latitude: 0,
        longitude: 0,
        zoom: 17

      },
      // lat: 0,
      // long: 0,
      // info: null,
      // popupInfo: null,
      // tree: null
  
      
    };

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
    window.addEventListener('resize', this._resize);
    this._resize();
  }


  //this updates the initial state of viewport (latitude and longitude) so that when the page loads the map centers on the first tree in the array.
  //   https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
  componentWillReceiveProps = props => {
 
    props.treesData[0] &&
      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          longitude: parseFloat(props.treesData[0].longitude),
          latitude: parseFloat(props.treesData[0].latitude)
        }
      }));
  };

  _resize = () => {
    const AppDims = document.querySelector(".mapWrapper")
    // console.log(AppDims.offsetWidth)
    this._onViewportChange({
      width: AppDims.offsetWidth,
      height: AppDims.offsetHeight 
    });
  }
  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };
  _onViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }
  _renderMarker = (tree, index) => {
    // console.log(tree)
    return (
      <Marker
        key={index}
        longitude={parseFloat(tree.longitude)}
        latitude={parseFloat(tree.latitude)}
      >
       <div className="treepin"
          onClick={() => this.setState({
           tree: tree
          })}
        >
          {tree.status === "Alive" && (
            <p className="mrkr-alive">{`\u{1F333}`}</p>
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
    );
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

  render() {
    const { viewport } = this.state;
    const TREES = this.props.treesData && this.props.treesData;
    // console.log(window.innerWidth)
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
        {TREES && TREES.map(this._renderMarker)}

        {/* {this._renderPopup()} */}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._onViewportChange} />
        </div> 
      </ReactMapGL>
    );
  }
}

export default Map;


   
