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
   
      
        <InputPlus
          
          filtered={this.props.filtered}
          getData={this.props.getData}
          searchString={this.props.searchString}
          getSearch={this.props.getSearch}
          initSrchVal={this.props.initSrchVal}
          value={this.props.searchString}
          scrollToView={this.props.scrollToView}
          searchClick={this.props.searchClick}
          getSetSearch={this.props.getSetSearch}  

        />

      
        )
      }
    }
    
    export default Search
