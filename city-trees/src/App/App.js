import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import TreesList from "../TreesList/TreesList.js"
// import Filters from "../Filters/Filters";
import Map from "../Map/Map.js"
// import ReactDOM from "react-dom";

import Header from "./Header"
// import Search from "./Search";
import { apiSearch } from './Api.js'
import { apiSelection } from './Api.js'
import { capitalize } from './Shared'
import { blackList } from './Shared'
import { filterData } from './Shared'

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
      searchInfo: {},
      value: '00083',
      type: 'zipcode'
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
    await this.getSearch('00083', 'zipcode')
    

    window.addEventListener("scroll", this.handleScroll)
  }
  onSubmit = async(evt, value) => {
    console.log(evt, value)
    evt.preventDefault()
    // console.log('test')
    // let b = await value && value.length > 2 && 
    // axios.get(apiSearch(value))
    // console.log(b)
  }

  getData = async (value,type) => {
    console.log('value,type', value, type)
 
    // console.log('value', value,sec[Object.keys(sec)[0]])
    
    console.log(value, type && type)
  
    let b = await value && value.length > 2 && 
    axios.get(apiSelection(value, type))
    
    .then(e=>this.setState({filteredMap:e.data, type:type}))
  

  }

  getSearch = async(value) => {
    console.log('v',value)
    let res = await axios(apiSearch(value))
    console.log(res)
    let flatFiltMap =  [].concat.apply([], filterData(value, res.data))
    console.log(res)


    this.setState({
      filteredMap:res.data
    })
  }

  render() {
    console.log(this.state)
    const data = this.state.filteredMap
    data && data.map(e=>{

    })
    // let sh = this.filterTrees(this.state.searchString, this.state.trees)
    // console.log(sh)

    // this.getURL()
    return (
      <div className="App">
        <Header
          getData={this.getData}
          getSearch={this.getSearch}  
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
             
           
              filtered={this.state.filtered}
              filteredMap={this.state.filteredMap}
              type={this.state.type}
              value={this.state.value}
             
            />
            {/* <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula,e turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor quet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.</div> */}
          </div>
        </div>
        <footer className="footer">footer</footer>
      </div>
    )
  }
}

export default App
