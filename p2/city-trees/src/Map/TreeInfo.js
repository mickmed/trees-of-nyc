import React, { PureComponent } from "react";

class TreeInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const { coordinates } = this.props;

    return (
      <div className="popup">
        <p>place: {info.place}</p>
        <p>longitude: {coordinates[0]}</p>
        <p>latitude: {coordinates[1]}</p>
        <p>magnitude: {info.mag}</p>
        <p>time: {new Date(info.time).toString()}</p>
      </div>
    );
  }
}

export default TreeInfo;
