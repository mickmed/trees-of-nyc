import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import TreesList from "../TreesList/TreesList.js";
// import Filters from "../Filters/Filters";
import Map from "../Map/Map.js";
// import ReactDOM from "react-dom";

import Header from "./Header";
// import Search from "./Search";
import { apiSearch } from "./Api.js";
import { apiSelection } from "./Api.js";
import { capitalize } from "./Shared";
import { blackList } from "./Shared";
import { filterData } from "./Shared";

const TREES_URL =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=2000";

// const TREES_URL2 =
// "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=5000";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // trees: [],
      // boroname: "&boroname=Manhattan",
      // zipcode: "&zipcode=10001",
      // spc_common: "",
      // status: "&status=Alive",
      // health: "",
      fixHeader: false,
      input: "",
      searchString: "",
      searchInfo: {},
      value: "00083",
      type: "zipcode",
      clicked: false
    };
  }

  async componentDidMount() {
    await this.getSetSearch("00083", "zipcode");
    window.addEventListener("scroll", this.handleScroll);
  }

  getSetSearch = async (value, type) => {
    console.log(value, type);
    let res = await axios(apiSelection(value, type));
    console.log(res);
    // let flatFiltMap =  [].concat.apply([], filterData(value, res.data))
    // console.log(filterData(value, res.data))
    this.setState({
      filteredMap: res.data,
      filteredList: res.data,
      value: value,
      type: type,
      fromKey: false
    });
  };
  handleClick = (type, value) => {
    // console.log(typeConverter(type))tyep
    console.log(type, value);

    let res =
      this.state.filteredList &&
      this.state.filteredList.filter(e => value === e[type] && e);
    console.log(res);
    // console.log(res)
    this.setState({
      filteredMap: res,
      selected: value
    });
  };
  // onSubmit = async(evt, value) => {
  //   console.log(evt, value)
  //   evt.preventDefault()
  //   // console.log('test')
  //   // let b = await value && value.length > 2 &&
  //   // axios.get(apiSearch(value))
  //   // console.log(b)
  // }

  getSearch = async value => {
    let b =
      (await value) &&
      value.length > 2 && 
      axios
        .get(apiSearch(value))

        .then(e =>
          this.setState({
            filteredMap: e.data,
            filteredList: e.data,
            value: value,
            type: "",
            fromKey: true,
            filteredData: filterData(value, e.data)
          })
        );
  };

  render() {
    console.log("state", this.state);
    const data = this.state.filteredMap;
    data && data.map(e => {});
    // let sh = this.filterTrees(this.state.searchString, this.state.trees)
    // console.log(sh)

    // this.getURL()
    return (
      <div className="App">
        <Header
          getSearch={this.getSearch}
          getSetSearch={this.getSetSearch}
          onsubmit={this.onSubmit}
          fixHeader={this.state.fixHeader}
          value={this.state.value}

          // searchString={this.state.searchString}
          // filtered={sh[0]}
          // searchClick={this.searchClick}
        />

        <div className="homeComponent">
          {/* <Search /> */}
          <div className="mapWrapper">
            <Map
              // component={Map}
              treesData={this.state.trees}
              filteredMap={this.state.filteredMap}
              // zipcode={this.state.zipcode}
            />
          </div>

          <div className="locationsListWrapper">
            {/* <h3>&#x1F333; NYC TREES &#x1F333; </h3> */}
            {/* <Filters
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
            /> */}
            <TreesList
              treesData={this.state.trees}
              fixHeader={this.state.fixHeader}
              fromKey={this.state.fromKey}
              filteredData={this.state.filteredData}
              filtered={this.state.filtered}
              filteredList={this.state.filteredList}
              type={this.state.type}
              value={this.state.value}
              handleClick={this.handleClick}
              clicked={this.state.clicked}
              listType={this.state.listType}
              selected={this.state.selected}
              getSetSearch={this.getSetSearch}
            />
          </div>
        </div>
        <footer className="footer">footer</footer>
      </div>
    );
  }
}

export default App;
