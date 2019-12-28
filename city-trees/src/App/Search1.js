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
  componentDidMount() {}

  handleOnSubmit = () => {
    console.log("hi")
  }

  renderFiltered = () => {
    const filtered = this.props.filtered && this.props.filtered
    if (this.props.filtered) {
      return Object.keys(filtered).map(key => {
        return filtered[key]
          .sort()
          .slice(0, 3)
          .map(e => {
            return e
          })
      })
    }
  }
  render() {
    // console.log(this.renderFiltered())

    const flattened =
      this.props.filtered && [].concat.apply([], this.renderFiltered())
    // console.log(flattened)
    // console.log(this.props)
    // const filtered = this.props.filtered && this.props.filtered
    // if (this.props.filtered) {
    //   return Object.keys(filtered).map(key => {
    //     return (
    //       <div>
    //         <div>{key}</div>
    //         {filtered[key] .sort() .slice(0, 5).map(e=><div>{e}</div>)}
    //       </div>
    //     )
    //   })
    // }
    const style = this.props.style
    // const recentSearches = flattened || ['']
    // console.log(recentSearches)
    // const placeholder = "Search films..."
    // const inputPosition = "center"
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
          />
        {/* </div> */}
        {/* <SuggestionInputSearch
          onSubmitFunction={this.handleOnSubmit}
          recentSearches={recentSearches}
          placeholder={placeholder}
          inputPosition={inputPosition}
        /> */}

        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    )
  }
}

export default Search
