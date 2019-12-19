import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import TreesList from "../TreesList/TreesList.js";
import Filters from "../Filters/Filters";
import Map from "../Map/Map.js";
import ReactDOM from "react-dom";

import Header from "./Header";
// import Search from "./Search";

const TREES_URL =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=2000";

// const TREES_URL2 =
// "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=5000";

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
      fixHeader: false,
      input: ""
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
  // viewportChange = (vpz) => {
  //   this.fetchData(TREES_URL2);

  // };
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
    window.addEventListener("scroll", this.handleScroll);
    // this.handleScroll();
    // window.addEventListener('scroll', this.handleScroll)
  }
  // handleScroll = () => {
  //   console.log("inside");
  //   // let headerHeight = document.getElementById("myHeader").offsetHeight
  //   const header = ReactDOM.findDOMNode(this).getElementsByClassName(
  //     "bigHeader"
  //   );
  //   const search = ReactDOM.findDOMNode(this).getElementsByClassName("search");
  //   // console.log("headerHeight", header.offsetHeight);
  //   // console.log('header', .6 * header[0].offsetHeight)
  //   // console.log("searchOffsetTop", search[0].offsetTop);

  //   console.log("windowScrollY", window.scrollY);

  //   if (window.scrollY < 0.5 * header[0].offsetHeight) {
  //     console.log("less than");
  //     this.setState({
  //       fixHeader: false
  //     });
  //   }
  //   if (window.scrollY > 0.5 * header[0].offsetHeight) {
  //     console.log("more than");
  //     this.setState({
  //       fixHeader: true,
  //       input: ""
  //     });
  //   }
  // };
  capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  onSubmit = evt => {
    evt.preventDefault();
  };

  onChange = evt => {
    let params = ["address", "spc_latin"];

    // console.log(evt.target.value, evt.target.value.length);
    evt &&
      (evt.target.value.length === 3 ||
        evt.target.value.length === 4 ||
        evt.target.value.length > 6) &&
      this.getData(evt.target.value);
    this.setState({
      // trees: trees,
      searchString: evt.target.value
    });
  };

  getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };
  getData = async srch => {
    // console.log('here')
    const tail =
      `address%20like%20%27%25${srch.toUpperCase()}%25%27` +
      `or ` +
      `address%20like%20%27%25${srch.toLowerCase()}%25%27` +
      `or ` +
      `address%20like%20%27%25${this.capitalize(srch)}%25%27`;

    const url =
      `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
      `$limit=1000` +
      `&$where=`;

    await axios
      .get(
        `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
          `$limit=1000` +
          `&$where=` +
          `address%20like%20%27%25${srch.toUpperCase()}%25%27` +
          `or ` +
          `address%20like%20%27%25${srch.toLowerCase()}%25%27` +
          `or ` +
          `address%20like%20%27%25${this.capitalize(srch)}%25%27` +
          `or ` +
          `spc_latin%20like%20%27%25${srch.toUpperCase()}%25%27` +
          `or ` +
          `spc_latin%20like%20%27%25${srch.toLowerCase()}%25%27` +
          `or ` +
          `spc_latin%20like%20%27%25${this.capitalize(srch)}%25%27` +
          `or ` +
          `spc_common%20like%20%27%25${srch.toUpperCase()}%25%27` +
          `or ` +
          `spc_common%20like%20%27%25${srch.toLowerCase()}%25%27` +
          `or ` +
          `spc_common%20like%20%27%25${this.capitalize(srch)}%25%27` +
          `or ` +
          `zipcode%20like%20%27%25${srch.toUpperCase()}%25%27` +
          `or ` +
          `zipcode%20like%20%27%25${srch.toLowerCase()}%25%27` +
          `or ` +
          `zipcode%20like%20%27%25${this.capitalize(srch)}%25%27`
      )
      .then(response => {
        const trees = response.data;
<<<<<<< HEAD
        console.log(trees);   
        const stuff = {};
=======
>>>>>>> 3d1aaba6e64b92d128faad4d9a0a7babf38f8514
        const filtered = [];
        const arr = [];
      
     
        trees.map((obj, i) => {
      
          Object.entries(obj).map((str, index) => {
            
            if (typeof str[1] === "string") {
            
              if (
                str[1].includes(srch) ||
                str[1].includes(srch.toLowerCase()) ||
                str[1].includes(srch.toUpperCase()) ||
                str[1].includes(this.capitalize(srch))
              ) {
<<<<<<< HEAD
                if (!arr.includes(str[0])) {
                  arr.push(str[0]) && filtered.push({ [str[0]]: [] });
                  // console.log('index', index)
                  // console.log('str0', str[0])  
                  // console.log('str1', str[1])
                  // console.log('filtered', filtered)
                  // console.log('filtered length', filtered.length)
                }
                if (arr.includes(str[0])) {
                  filtered.forEach(fil => {
                    do {
                      fil[str[0]] && fil[str[0]].push(obj);
                    } while (
                      fil[str[0]] &&
                      fil[str[0]].forEach(f => {
                        // console.log(f[str[0]]);

                        return f[str[0]] !== obj[str[0]]
                      })
                    );
                  });
                }
                console.log(filtered);

                if (srch.match(/^\d/)) {
                  // if (
                  //     srch.indexOf(" ") !== -1 &&
                  //     srch[srch.indexOf(" ") + 1] !== "undefined"
                  //   )
                  // console.log("number with space ");
                } else {
                  // console.log("not number");
                  // str[1] = str[1].slice(str[1].indexOf(" ")); //chop number of address
                }
=======
                
                filtered.push({[str[0]]:str[1]})
              
                // if (!arr.includes(str[0])) {
                //   arr.push(str[0]) && filtered.push({ [str[0]]: [] });
                // }
                // if(arr.includes(str[0])){
                // filtered.push({ [str[0]]: [str[1]] });
                // }
>>>>>>> 3d1aaba6e64b92d128faad4d9a0a7babf38f8514
              }
            }
          })
        });
     
        this.setState({
        trees:trees,
        filtered:filtered
      })
      })
      
    }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // }

  handleClickSearch = clickedValue => {
    console.log(clickedValue);
    this.setState({
      searchString: clickedValue
    });
    this.getData(clickedValue);
  };
  render() {


    return (
      <div className="App">
        <Header
          onchange={this.onChange}
          onsubmit={this.onSubmit}
          fixHeader={this.state.fixHeader}
          searchString={this.state.searchString}
        />

        <div className="homeComponent">
          {/* <Search /> */}
          <div className="mapWrapper">
            <Map
              // component={Map}
              treesData={this.state.trees}
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
              searchString={this.state.searchString}
              handleClickSearch={this.handleClickSearch}
              filtered={this.state.filtered}
            />
            {/* <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula,e turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor quet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.</div> */}
          </div>
        </div>
        <footer className="footer">footer</footer>
      </div>
    );
  }
}

export default App;
