import React, { Component } from "react";
import axios from "axios";
import ReactDOM from "react-dom";


// const { API_KEY } = process.env
// const API_URL = ''

class Search extends Component {
  state = {
    query: "",
    trees: []
  };
  componentDidMount(){
 

  }
  scrollToView = () => {
    console.log('hi')
    console.log(this.props.fixHeader)
    window.scrollTo(0, this.props.searchHeight + this.props.bigHeaderHeight) 
    // this.props.search.scrollIntoView()
  }

  render() {
      // console.log(this.props.children)
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
          onClick={this.scrollToView}
        />

        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    );
  }
}

export default Search;
