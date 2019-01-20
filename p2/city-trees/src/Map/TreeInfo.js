import React, { PureComponent } from "react";

class TreeInfo extends PureComponent {
  render() {

    const {info} = this.props
    console.log(info)

    return (
      <div className="popup">
        {/* <p>place: {info.place}</p> */}
        {/* <p>longitude: {lat}</p> */}
        {/* <p>latitude: {long}</p> */}
        {/* <p>magnitude: {info.mag}</p> */}
        {/* <p>time: {new Date(info.time).toString()}</p> */}
      </div>
    );
  }
}

export default TreeInfo;
