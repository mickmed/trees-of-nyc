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
      console.log(this.state.query)
    axios.get(`https://data.cityofnewyork.us/resource/5rq2-4hqu.json?&boroname=Manhattan&$where=address%20like%20%27%25${this.state.query}%25%27`)
    .then(response => {
        const trees = response.data;
        console.log(trees)
        this.setState({
          trees: trees
        });
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
       
    })
  }

  render() {
    //   console.log(this.state.trees)
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    )
  }
}

export default Search