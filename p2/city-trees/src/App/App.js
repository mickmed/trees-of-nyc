import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import TreesList from "../TreesList/TreesList.js";

// import Map from "../Map";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: []
    };
  }

  componentDidMount() {
    const TREES_URL =
      "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=2";
    axios
      .get(TREES_URL)
      .then(response => {
        const trees = response.data;
        this.setState({
          trees: trees
        });
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }
  render() {
    const treesData = this.state.trees;
    console.log(treesData)
    return (
      <div className="App">
        <div className="mapContainer">
          {/* <Map component={Map} treeData={treeData} /> */}
        </div>
        <div className="treeContainer">
          <h1>Trees in NYC: </h1>
          <div className="tree-inner">
          <TreesList treesData={treesData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

