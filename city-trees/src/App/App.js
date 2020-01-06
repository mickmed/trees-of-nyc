import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import TreesList from "../TreesList/TreesList.js"
// import Filters from "../Filters/Filters";
import Map from "../Map/Map.js"
// import ReactDOM from "react-dom";

import Header from "./Header"
// import Search from "./Search";
import Api from './Api'
import { capitalize } from './Shared'
import { blackList } from './Shared'

const TREES_URL =
  "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=2000"

// const TREES_URL2 =
// "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=5000";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trees: [],
      boroname: "&boroname=Manhattan",
      zipcode: "&zipcode=10001",
      spc_common: "",
      status: "&status=Alive",
      health: "",
      fixHeader: false,
      input: "",
      searchString: '',
      searchInfo: {}
    }
  }

  fetchData = async (url, param) => {
    let urlStr
    if (param) {
      urlStr = url + param
    } else {
      urlStr =
        url +
        this.state.boroname +
        this.state.zipcode +
        this.state.status +
        this.state.spc_common
    }

    await axios

      .get(urlStr)
      .then(response => {
        const trees = response.data
        this.setState({
          trees: trees
        })
      })
      .catch(error => {
        console.error("Error: ", error)
      })
  }

  boroClk = e => {
    let boroname = "&boroname=" + e.target.value
    this.setState({ boroname: boroname })

    let str =
      boroname + this.state.spc_common + this.state.status + this.state.health
    this.fetchData(TREES_URL, str)
  }

  zipChng = e => {
    //chk for empty zip
    let zip
    e.target.value === "" ? (zip = "") : (zip = "&zipcode=" + e.target.value)
    this.setState({ zipcode: "&zipcode=" + e.target.value })

    //chk for empty species
    let spec
    this.state.spc_common === "" ? (spec = "") : (spec = this.state.spc_common)
    this.setState({ zipcode: "&zipcode=" + e.target.value })

    //set url parameters
    let str =
      this.state.boroname + zip + spec + this.state.status + this.state.health
    this.fetchData(TREES_URL, str)
  }

  speciesChng = e => {
    //chk for empty species
    let specs
    e.target.value === ""
      ? (specs = "")
      : (specs = "&spc_common=" + e.target.value)

    //chk for empty zip
    let zips
    this.state.zipcode === "" ? (zips = "") : (zips = this.state.zipcode)
    this.setState({ spc_common: "&spc_common=" + e.target.value })

    //set url parameters
    let str =
      this.state.boroname + zips + specs + this.state.status + this.state.health
    this.fetchData(TREES_URL, str)
  }

  sttsClk = e => {
    this.setState({ status: e.target.value })
    let str =
      this.state.boroname +
      this.state.zipcode +
      this.state.spc_common +
      e.target.value
    this.fetchData(TREES_URL, str)
  }

  hlthClk = e => {
    this.setState({ health: e.target.value })
    let str =
      this.state.boroname +
      this.state.zipcode +
      this.state.spc_common +
      this.state.status +
      e.target.value
    this.fetchData(TREES_URL, str)
  }

  async componentDidMount() {
    await this.onChange('00083')
    

    window.addEventListener("scroll", this.handleScroll)
  }
  onSubmit = evt => {
    evt.preventDefault()
    console.log('test')
  }

  onChange = async (value,sec) => {
    console.log('value', value,sec)
    let srch = value[0]
    // this.setState({
    //   // trees: trees,
    //   searchString: srch
    // })
    let b = await srch && srch.length > 2 && 
   
    this.getData(srch)
    .then(e=>this.filterTrees(srch, e))
    .then(f=>this.setState({
      filteredMap:f
    }))
      // .then(e => {

    

  }
  filterTrees = async (srch, data) => {
    const trees = data.data
    console.log(srch, trees)
    const arr = []
    const filtered = {}
    const filteredMap = {}
    trees && trees.map((obj, i) => {
      Object.entries(obj).map((str, index) => {
        if (typeof str[1] === "string") {
          if (
            str[1].includes(srch) ||
            str[1].includes(srch.toLowerCase()) ||
            str[1].includes(srch.toUpperCase()) ||
            str[1].includes(capitalize(srch))
          ) {
            if (!arr.includes(str[0])) {
              if (!blackList().includes(filteredMap[str[0]])) {
                arr.push(str[0])
                filtered[str[0]] = [str[1]]
                filteredMap[str[0]] = []
              }
            }
            if (arr.includes(str[0])) {
              // console.log(filtered[str[0]])
              if (!blackList().includes(filteredMap[str[0]])) {
                filtered[str[0]] &&
                  !filtered[str[0]].includes(str[1]) &&
                  filtered[str[0]].push(str[1])
                filteredMap[str[0]] &&
                  !filteredMap[str[0]].includes(str[1]) &&
                  filteredMap[str[0]].push(obj)
              }
            }
          }
        }
      })
    })
    // console.log(filteredMap)
    const filt =
      filteredMap &&
      Object.keys(filteredMap).map(key => {
        // console.log(key)
        return filteredMap[key]
      })

    let flatFiltMap = filteredMap && [].concat.apply([], filt.reverse())
    // return [filtered, flatFiltMap, filteredMap]
    return flatFiltMap
  }

  getData = async (srch, click) => {
    console.log(srch)
    let data = await axios
      .get(Api(srch))
// .then(e => e.data)
        // console.log(e)
      return data
      // console.log(data)

      // this.setState({
      //   searchString: srch,
      //   trees:data.data
      // })
      
    
      // .then(response => {

      //   // console.log(flatFiltMap)
      //   // filteredMap.sort((a, b, key) => {
      //   //   let comparison = 0
      //   //   if (a.key > b.key) {
      //   //     comparison = 1
      //   //   } else if (a.key < b.key) {
      //   //     comparison = -1
      //   //   }
      //   // })

      //   this.setState({
      //     // trees:trees,
      //     trees: response.data,
      //     srch: srch
      //     // filtered: click !== 'click' && filtered,
      //     // filteredMap: click === 'click' && flatFiltMap,
      //     // searchInfo: click === 'click' && filteredMap


      //   })
   
      // })
  }

  handleClickSearch = clickedValue => {
    // console.log(clickedValue)
    this.setState({
      searchString: clickedValue
    })
    this.getData(clickedValue)
  }

  searchClick = (val, click) => {
    console.log('here', val)
    this.getData(val, click)

  }
  render() {
    console.log(this.state)
    let sh = this.filterTrees(this.state.searchString, this.state.trees)
    // console.log(sh)

    // this.getURL()
    return (
      <div className="App">
        <Header
          onchange={this.onChange}
          onsubmit={this.onSubmit}
          fixHeader={this.state.fixHeader}
          searchString={this.state.searchString}
          filtered={sh[0]}
          searchClick={this.searchClick}
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
            {/* <TreesList
              treesData={this.state.trees}
              fixHeader={this.state.fixHeader}
              searchString={this.state.searchString}
              handleClickSearch={this.handleClickSearch}
              filtered={this.state.filtered}
              filteredMap={this.state.filteredMap}
              searchInfo={sh[2]}
            /> */}
            {/* <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula,e turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor quet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.</div> */}
          </div>
        </div>
        <footer className="footer">footer</footer>
      </div>
    )
  }
}

export default App
