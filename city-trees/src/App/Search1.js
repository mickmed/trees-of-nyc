import React, { Component } from "react";
// import axios from "axios";
// import ReactDOM from "react-dom";


// const { API_KEY } = process.env
// const API_URL = ''

class Search extends Component {
  state = {
    query: "",
    trees: []
  };
  componentDidMount(){
 

  }


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
          placeholder="search..."
          onChange={this.props.onchange}
          onClick={this.props.scrollToView}
          value={this.props.searchString}
          
        />

        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    );
  }
}

export default Search;
