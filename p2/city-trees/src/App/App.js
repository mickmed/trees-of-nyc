import React, { Component } from "react";
import "./app.css";
import axios from "axios";
import TreesList from "../TreesList/TreesList.js";
import Map from "../Map/Map.js";

// import Map from "../Map";
const TREES_URL =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=1000";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      boro: "&boroname=Manhattan",
      zipcode: "",
      spcCommon: "",
      status: "",
      health: ""
    };
  }

  fetchData = async (url, param) => {
    let urlStr;
    if (param) {
      urlStr = url + param;
    } else {
      urlStr = url + this.state.boro + this.state.zipcode + this.state.status + this.state.spcCommon;
    }
    console.log(urlStr);
    await axios
      .get(urlStr)
      .then(response => {
        const trees = response.data;
        this.setState({
          trees: trees
        });
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

  //functions for button and select clicks/chngs
  boroClk = e => {
    // console.log(e.target.value);
    
    let str =
      e.target.value +
      this.state.status 
      this.setState({ boro: e.target.value });
    this.fetchData(TREES_URL, str);
  };

  zipChng = e => {
    this.setState({ zipcode: "&zipcode=" + e.target.value });
    let str =
      this.state.boro +
      this.state.status +
      this.state.spcCommon +
      "&zipcode=" +
      e.target.value;
    this.fetchData(TREES_URL, str);
  };

  speciesChng = e => {
    console.log(e.target.value);
    this.setState({ spcCommon: "&spc_common=" + e.target.value });
    let str =
      this.state.boro +
      this.state.status +
      
      "&spc_common=" +
      e.target.value;
    this.fetchData(TREES_URL, str);
  };

  sttsClk = e => {
    this.setState({ status: e.target.value });
    let str = this.state.boro + e.target.value;
    this.fetchData(TREES_URL, str);
  };

  hlthClk = e => {
    this.setState({ health: e.target.value });
    let str = this.state.boro + this.state.status + e.target.value;
    this.fetchData(TREES_URL, str);
  };

  componentDidMount() {
    this.fetchData(TREES_URL);
  }

  render() {
    return (
      <div className="App">
        <div className="mapContainer">
          <Map component={Map} treesData={this.state.trees} />
        </div>
        <div className="treeContainer">
          <h3>NYC TREES &#x1F600; &#x1F333; </h3>
          <div className="tree-inner">
          
            <TreesList
              treesurl={TREES_URL}
              treesData={this.state.trees}
              boroClk={this.boroClk}
              sttsClk={this.sttsClk}
              hlthClk={this.hlthClk}
              zipChng={this.zipChng}
              speciesChng={this.speciesChng}
              boro={this.state.boro}
              status={this.state.status}
              health={this.state.health}
              zipcode={this.state.zipcode}
              spcCommon={this.state.spcCommon}
              
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
