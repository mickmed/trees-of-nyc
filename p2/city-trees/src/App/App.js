import React, { Component } from "react"
import "./app.css"
import axios from "axios";
import TreesList from "../TreesList/TreesList.js"
import Map from "../Map/Map.js";

// import Map from "../Map";
const TREES_URL =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=6";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      trees: [],
      status: "&status=Alive",
      boro: "&boroname=Manhattan",
      health: "&health=Good",
      zipcode: "&zipcode=10002",
     
    };
  }

  fetchData = async (url, param) => {
    let urlStr;
    if (param) {
      urlStr = url + param;
    } else {
      urlStr = url + this.state.boro + this.state.status;
    }
    console.log(urlStr);
    await axios
      .get(urlStr)
      .then(response => {
        const trees = response.data;
       
        
        this.setState({
          
          trees: trees,
          
          
        });
        
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

 

  boroClk = e => {
   
    let str = e.target.value + this.state.status;
    
    this.fetchData(TREES_URL, str);
     this.setState({ boro: e.target.value });
     
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

  zipChng = e => {
    console.log(e.target.value);
    this.setState({ zipcode: "&zipcode=" + e.target.value });
    let str =
      this.state.boro + this.state.status + "&zipcode=" + e.target.value;
      
    this.fetchData(TREES_URL, str);
    
  };

  componentDidMount() {
   
    this.fetchData(TREES_URL);
  }

  render() {
    console.log(this.state.trees);

    return (
      <div className="App">
        <div className="mapContainer">
          <Map component={Map} treesData={this.state.trees} />
        </div>
        <div className="treeContainer">
          <h1>Trees in NYC: </h1>
          <div className="tree-inner">
            <TreesList
              treesurl={TREES_URL}
              treesData={this.state.trees}
              boroZips={this.state.boroZips}
              boroClk={this.boroClk}
              sttsClk={this.sttsClk}
              hlthClk={this.hlthClk}
              zipChng={this.zipChng}
              
              boro={this.state.boro}
              status={this.state.status}
              health={this.state.health}
              zip={this.state.zipcode}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
