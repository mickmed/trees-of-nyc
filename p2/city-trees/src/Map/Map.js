import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
// import TreePin from "./tree-pin.js";
import TreeInfo from "./TreeInfo";
// import ControlPanel from "./control-panel.js";
import "./Map.css";
import App from "../App/App";

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWlja21lZCIsImEiOiJjanFzdTVtZjEwMnY0NDJzM2g4MXNuNTM0In0.VDbqZxEh0hxXAixRjS9FzA'
const h = window.innerHeight
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
      trees: [],
      boroname: "&boroname=Manhattan",
      zipcode: "",
      spc_common: "",
      status: "&status=Alive",
      health: "",

      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 0,
        longitude: 0,
        zoom: 14
      },
      lat: 0,
      long: 0,
      info: null,
      popupInfo: null
    };

    this._renderMarker = this._renderMarker.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
  }
  componentDidMount() {
    const AppDims = document.querySelector(".App")
    console.log(AppDims)
    if (AppDims.offsetWidth < 900 && AppDims.offsetWidth < AppDims.offsetHeight) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: '100%',
          height: AppDims.offsetHeight / 2 + 'px',
          appDims: AppDims,
        }
      })
    }
    else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: '100%',
          height: AppDims.offsetHeight / 1.25 + 'px',
          appDims: AppDims,
        }
      })
    }
    window.addEventListener('resize', this._resize);
    this._resize();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.viewport.zoom !== prevState.viewport.zoom) {
      if (this.state.viewport.zoom > 15) {
        this.props.vpc();
      }
    }
    // console.log(this.state.viewport.zoom, prevState.viewport.zoom);  
  }

  //this updates the initial state of viewport (latitude and longitude) so that when the page loads the map centers on the first tree in the array.
  //   https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
  componentWillReceiveProps = props => {
    // console.log(props.zipcode);
    // console.log(this.state.viewport);
    props.treesData[0] &&
      this.setState(prevState => ({
        viewport: {
          ...prevState.viewport,
          longitude: parseFloat(props.treesData[0].longitude),
          latitude: parseFloat(props.treesData[0].latitude)
          // zoom: props.zipcode === "&zipcode=" ? 12 : 14
        }
      }));
  };
  
  _resize = () => {
    const AppDims = document.querySelector(".mapWrapper")
    // console.log(AppDims.offsetWidth)
    this._onViewportChange({
      width: AppDims.offsetWidth,
      height: AppDims.offsetHeight - AppDims.offsetHeight / 10
    });
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };
  _onViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }
  _renderMarker(tree, index) {
    return (
      <Marker
        key={index}
        longitude={parseFloat(tree.longitude)}
        latitude={parseFloat(tree.latitude)}
      >
        <div className="treepin">
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
      </Marker>
    );
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <TreeInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    const TREES = this.props.treesData && this.props.treesData;
    if (viewport.zoom > 15) {
      // console.log("hi");
    }
    // console.log(viewport.zoom);
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
        <div onLoad={this.hello} />
        {this.state.popupInfo}
        {TREES && TREES.map(this._renderMarker)}

        {this._renderPopup()}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </ReactMapGL>
    );
  }
}

export default Map;
