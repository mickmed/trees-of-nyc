import React, { Component } from "react"
// import axios from "axios";
// import ReactDOM from "react-dom";
import InputPlus from "./InputPlus"

import SuggestionInputSearch from "suggestion-react-input-search"

// const { API_KEY } = process.env
// const API_URL = ''

class Search extends Component {
  state = {
    query: "",
    trees: []
  }
 

  render() {

    const style = this.props.style
  
    return (
      <form onSubmit={this.props.onsubmit}>
        {/* <input
          type="text"
          name="input"
          className="search-input"
          style={style}
          placeholder="search..."
          onChange={this.props.onchange}
          onClick={this.props.scrollToView}
          value={this.props.searchString}
        /> */}
        {/* <div onClick={this.props.scrollToView}> */}
          <InputPlus
           
            filtered={this.props.filtered}
            onchange={this.props.onchange}
            searchString={this.props.searchString}
            value={this.props.searchString}
            scrollToView={this.props.scrollToView}
            searchClick={this.props.searchClick}
          />
     

        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    )
  }
}

export default Search
