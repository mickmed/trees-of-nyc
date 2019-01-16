import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import TreePin from "./tree-pin.js";
import TreeInfo from "./TreeInfo";
// import ControlPanel from "./control-panel.js";


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


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
      viewport: {
        width: 700,
        height: 600,
        latitude: 0,
        longitude: 0,
        zoom: 12

      },
      coordinates: null,
      info: null
    };

    this._renderMarker = this._renderMarker.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
  }

  //this updates the initial state of viewport (latitude and longitude) so that when the page loads the user sees the portion of the map that has the newsest quake on it.
//   https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
  componentWillReceiveProps = props => {
      // console.log(props.treesData)
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        longitude: parseFloat(props.treesData[0].longitude),
        latitude: parseFloat(props.treesData[0].latitude)
      }
    }))
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  }

  _renderMarker(tree, index) {
   
    return (
        
      <Marker
      
        key={index}
        longitude={parseFloat(tree.longitude)}
        latitude={parseFloat(tree.latitude)}
      >
        {/* <div className="tree-pin">
            
        </div> */}
        <TreePin
          size={20}
          onClick={() =>
            this.setState({
              // coordinates: tree.geometry.coordinates,
              // info: tree.properties
            })
          }
        />
      </Marker>
    );
  }

  _renderPopup() {
    // const { coordinates } = this.state && this.state;
    // const { info } = this.state && this.state;
    console.log(this.state)
    // return (
    //   coordinates && (
    //     <Popup
    //       tipSize={5}
    //       anchor="top"
    //       longitude={coordinates[0]}
    //       latitude={coordinates[1]}
    //       closeOnClick={false}
    //       onClose={() => this.setState({ coordinates: null })}
    //     >
    //       <TreeInfo coordinates={coordinates} info={info} />
    //     </Popup>
    //   )
    // );
  }

  render() {
    const { viewport } = this.state;
    const TREES = this.props.treesData;
    // console.log(TREES)

    return (
      <ReactMapGL
        className="map"
        width={viewport.width}
        height={viewport.height}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <div onLoad={this.hello} />
        {this.state.popupInfo}
        {TREES && TREES.map(this._renderMarker)}
        {this._renderPopup()}
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
        {/* <ControlPanel containerComponent={this.props.containerComponent} /> */}
      </ReactMapGL>
    );
  }
}

export default Map;