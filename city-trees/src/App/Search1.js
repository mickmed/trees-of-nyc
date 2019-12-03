import React, { Component } from "react";
import axios from "axios";

// const { API_KEY } = process.env
// const API_URL = ''

class Search extends Component {
  state = {
    query: "",
    trees: []
  };


  render() {
      // console.log(this.props)
    const style = this.props.style;
    return (
      <form onSubmit={this.props.onsubmit}>
        <input
          type="text"
          name="input"
          className="search-input"
          style={style}
          placeholder="street, species, zipcode, health, etc..."
          onChange={(evt)=>this.props.onchange(evt)}
        />

        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    );
  }
}

export default Search;
