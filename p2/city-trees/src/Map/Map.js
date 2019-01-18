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
        height: 550,
        latitude: 0,
        longitude: 0,
        zoom: 12
      },
      lat: 0,
      long: 0,
      info: null,
      popupInfo: null
    };

    this._renderMarker = this._renderMarker.bind(this);
    this._renderPopup = this._renderPopup.bind(this);
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

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderMarker(tree, index) {
    // console.log(tree.status)
    
    return (
      <Marker
        key={index}
        longitude={parseFloat(tree.longitude)}
        latitude={parseFloat(tree.latitude)}
        
      >
        <div className="tree-pin">
        &#x1F333;
       
        </div>

        {/* <TreePin
          size={20}
          onClick={() =>
            this.setState({
              lat: tree.longitude,
              long: tree.latitude
              // info: tree.properties
            })
          }
        /> */}
      </Marker>
    );
  }

  // _renderPopup() {
  //   // console.log(this.state && this.state);
  //   const { lat } = this.state && this.state;
  //   const { long } = this.state && this.state;
  //   console.log(lat);

  //   return (
  //     <Popup
  //       tipSize={5}
  //       anchor="top"
  //       longitude={parseFloat(long)}
  //       latitude={parseFloat(lat)}
  //       closeOnClick={false}
  //       onClose={() => this.setState({ latitude: null, longitude: null })}
  //     >
  //       <TreeInfo lat={lat} long={long} />
  //     </Popup>
  //   );
  // }

  _renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({popupInfo: null})} >
        <TreeInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {
    const { viewport } = this.state;
    const TREES = this.props.treesData && this.props.treesData;
    // console.log(this.state);
    
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
        {/* {console.log(this.props && this.props)} */}
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
