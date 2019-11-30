import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import TreesList from "../TreesList/TreesList.js";
import Filters from "../Filters/Filters";
import Map from "../Map/Map.js";

import Header from "./Header";
// import Search from "./Search";


const TREES_URL =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=2000";

const TREES_URL2 =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=5000";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      boroname: "&boroname=Manhattan",
      zipcode: "&zipcode=10001",
      spc_common: "",
      status: "&status=Alive",
      health: "",

    };
  }


  fetchData = async (url, param) => {
    let urlStr;
    if (param) {
      urlStr = url + param;
    } else {
      urlStr =
        url +
        this.state.boroname +
        this.state.zipcode +
        this.state.status +
        this.state.spc_common;
    }

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
  viewportChange = (vpz) => {
    this.fetchData(TREES_URL2);

  };
  //functions for button and select clicks/chngs
  boroClk = e => {
    let boroname = "&boroname=" + e.target.value;
    this.setState({ boroname: boroname });

    let str =
      boroname + this.state.spc_common + this.state.status + this.state.health;
    this.fetchData(TREES_URL, str);
  };

  zipChng = e => {
    //chk for empty zip
    let zip;
    e.target.value === "" ? (zip = "") : (zip = "&zipcode=" + e.target.value);
    this.setState({ zipcode: "&zipcode=" + e.target.value });

    //chk for empty species
    let spec;
    this.state.spc_common === "" ? (spec = "") : (spec = this.state.spc_common);
    this.setState({ zipcode: "&zipcode=" + e.target.value });

    //set url parameters
    let str =
      this.state.boroname + zip + spec + this.state.status + this.state.health;
    this.fetchData(TREES_URL, str);
  };

  speciesChng = e => {
    //chk for empty species
    let specs;
    e.target.value === ""
      ? (specs = "")
      : (specs = "&spc_common=" + e.target.value);

    //chk for empty zip
    let zips;
    this.state.zipcode === "" ? (zips = "") : (zips = this.state.zipcode);
    this.setState({ spc_common: "&spc_common=" + e.target.value });

    //set url parameters
    let str =
      this.state.boroname +
      zips +
      specs +
      this.state.status +
      this.state.health;
    this.fetchData(TREES_URL, str);
  };

  sttsClk = e => {
    this.setState({ status: e.target.value });
    let str =
      this.state.boroname +
      this.state.zipcode +
      this.state.spc_common +
      e.target.value;
    this.fetchData(TREES_URL, str);
  };

  hlthClk = e => {
    this.setState({ health: e.target.value });
    let str =
      this.state.boroname +
      this.state.zipcode +
      this.state.spc_common +
      this.state.status +
      e.target.value;
    this.fetchData(TREES_URL, str);
  };

  componentDidMount() {
    this.fetchData(TREES_URL);
  }

 
  render() {
    // console.log('t', this.state.zoom)
    return (
      <div className="App">
        <Header />

        <div className="homeComponent">
          {/* <Search /> */}
          <div className="mapWrapper">


            <Map
              component={Map}
              treesData={this.state.trees}
              zipcode={this.state.zipcode}
            />
          </div>

          <div className="locationsListWrapper">
            {/* <h3>&#x1F333; NYC TREES &#x1F333; </h3> */}
            <Filters
              treesurl={TREES_URL}
              boroClk={this.boroClk}
              sttsClk={this.sttsClk}
              hlthClk={this.hlthClk}
              zipChng={this.zipChng}
              speciesChng={this.speciesChng}
              boroname={this.state.boroname}
              status={this.state.status}
              health={this.state.health}
              zipcode={this.state.zipcode}
              spc_common={this.state.spc_common}
            />
            <TreesList treesData={this.state.trees} />
          </div>


        </div>
      </div>
    );
  }
}

export default App;
