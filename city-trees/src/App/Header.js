import React from "react";

function header() {
  return (
    <div>
      <div class="header" id="myHeader">
        <h2>My Header</h2>
      </div>
      <header>
        <h1>NEW YORK CITY TREES</h1>
        <p>
          <i>mapping the trees of NYC</i>
        </p>
        <img
          src="https://res.cloudinary.com/dw5c4jnc3/image/upload/v1547829310/nyc.png"
          alt="nyc trees"
        />
      </header>
    </div>
  );
}

export default header;
