import React, { Component } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
// import TreePin from "./tree-pin.js";
import TreeInfo from "./TreeInfo";
// import ControlPanel from "./control-panel.js";
import './Map.css'

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
        width: '100%',
        height: '100%',
        latitude: 0,
        longitude: 0,
        zoom: 11
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
          latitude: parseFloat(props.treesData[0].latitude),
          zoom: props.zipcode === "" ? 11 : 14
          
        }
      }));
  };

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderMarker(tree, index) {
    return (
      <Marker
        key={index}
        longitude={parseFloat(tree.longitude)}
        latitude={parseFloat(tree.latitude)}
      >
        <div>
          {tree.status === "Alive" && (
            <p className="mrkr-alive">{`\u{1F333}`}</p>
          )}

          {tree.status === "Stump" && (
            <p className="tree-pin" title={`\u{1F96B}`}>{`\u{1F96B}`}</p>
          )}

          {tree.status === "Dead" && (
            <p className="tree-pin" title={`\u{1F334}`}>{`\u{1F334}`}</p>
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
