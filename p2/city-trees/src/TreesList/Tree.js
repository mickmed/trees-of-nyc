import React from "react";

const Tree = props => {
//   const { mag, place, time, detail } = props.quake.properties;

//   const now = new Date().getTime();
//   const quakeTime = time;
//   const diff = now - quakeTime;
//   const hours = Math.floor(diff / 1000 / 3600);
//   const days = hours / 24;

//   const timeLength = () => {
//     if (days < 1) {
//       return `${hours.toFixed(0)} hours`;
//     } else {
//       return `${days.toFixed(0)} days`;
//     }
//   }
//   const styleMagDot = () => {
//     if (mag >= 6) {
//       return "red";
//     } else if (mag >= 5) {
//       return "orange";
//     } else {
//       return "yellow";
//     }
//   };

//   import React from "react";


    // const { mag, place, time, detail } = props.quake.properties;
  
    // const now = new Date().getTime();
    // const quakeTime = time;
    // const diff = now - quakeTime;
    // const hours = Math.floor(diff / 1000 / 3600);
    // const days = hours / 24;
  
    // const timeLength = () => {
    //   if (days < 1) {
    //     return `${hours.toFixed(0)} hours`;
    //   } else {
    //     return `${days.toFixed(0)} days`;
    //   }
    // }
    // const styleMagDot = () => {
    //   if (mag >= 6) {
    //     return "red";
    //   } else if (mag >= 5) {
    //     return "orange";
    //   } else {
    //     return "yellow";
    //   }
    // };
  
    return (
      <div className="tree">
      <p>{props.address}</p>
        {/* <h3>
          Place: <i>{place}</i>
        </h3>
        <div>
          Magnitude: {mag} &nbsp;
          <div className="magdot" style={{ backgroundColor: styleMagDot() }} />
        </div>
        <p>Time: {new Date(time).toString()}</p>
        <p>
          {timeLength()} ago
        </p>
        <p>
          <i>
            <a href={detail}>{detail}</a>
          </i>
        </p> */}
      </div>
    );
  // };
  
  
};

export default Tree;