import React, { Component } from "react";
import "./app.css";
import axios from "axios";
import TreesList from "../TreesList/TreesList.js";
import Map from "../Map/Map.js";

// import Map from "../Map";
const TREES_URL =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=200";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      status: ""
    };
  }

  fetchData = async (url, param) => {
    let urlStr;
    if (param) {
      urlStr = url + "&" + param;
    } else {
      urlStr = url + "&boroname=Manhattan";
    }
    await axios
      .get(urlStr)
      .then(response => {
        const trees = response.data;
        this.setState({
          trees: trees,
          status: param,
          bgcolor: 'blue'
        });
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

  fltrClk = (e) => {
    e.preventDefault()
    console.log(e.target)
    // for(let i=0;i<e.target.children;i++){
    //   e.target.children[i].style.backgroundColor = this.state.bgcolor;
    // }
    
    
    
    // e.target.style.backgroundColor=this.state.bgcolor
    this.fetchData(TREES_URL, e.target.value);
  };

  componentDidMount() {
    
    this.fetchData(TREES_URL);
  }

  render() {
    const treesData = this.state.trees;
    // console.log(treesData);
    return (
      <div className="App">
        <div className="mapContainer">
          <Map component={Map} treesData={treesData} />
        </div>
        <div className="treeContainer">
          <h1>Trees in NYC: </h1>
          <div className="tree-inner">
            <TreesList treesData={treesData} fltrClk={this.fltrClk} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
