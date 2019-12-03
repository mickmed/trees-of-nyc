import React, { Component } from 'react'
import axios from 'axios'

// const { API_KEY } = process.env
// const API_URL = ''

class Search extends Component {
  state = {
    query: '',
    trees: []
  }

  getInfo = () => {

  }



  render() {
    //   console.log(this.state.trees)
    const style = this.props.style
    return (
      <form>
        <input type="text" className="search-input" style={style} placeholder="street, species, zipcode, health, etc..." />

        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    )
  }
}

export default Search