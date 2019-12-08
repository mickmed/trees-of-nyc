import React, { Component } from "react";
import ReactDOM from "react-dom";
import Search1 from "./Search1";
import axios from "axios";

class header extends Component {
  state = {
    fixHeader: false
  };
  componentDidMount() {
    // this.fetchData(TREES_URL);
    window.addEventListener("scroll", this.handleScroll);
    const search = this.divElement
    const searchHeight = this.divElement.offsetHeight;
    const bigHeaderHeight = this.bigH.offsetHeight;
    this.setState({
      searchHeight: searchHeight,
      bigHeaderHeight: bigHeaderHeight,
      search:search
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    // let headerHeight = document.getElementById("myHeader").offsetHeight
    const header = ReactDOM.findDOMNode(this);
  
    // console.log("headerHeight", header.offsetHeight);
    // console.log('header', headerHeight)
    // console.log("searchOffsetTop", search[0].offsetTop);

    // console.log("windowScrollY", window.scrollY);

    if (window.scrollY < header.offsetHeight) {
      // console.log("less than");
      this.setState({
        fixHeader: false
      });
    }
    if (window.scrollY > header.offsetHeight) {
      this.setState({
        fixHeader: true,
        input: ""
      });
    }
  };

  render() {
    // console.log(this.state);
    // const header = ReactDOM.findDOMNode(this);

    // console.log(this.props);
    const style = this.state.fixHeader
      ? {
          searchInput: {
            // transform:'translateY(-150%)'
          },
          search: {
            position: "fixed",
            top: 0,
            width: "100%",
            height: "15%"
            // animation: 'fadeInSearch 1s',
            // justifyContent: 'flex-end'
          },
          banner: {
            position: "fixed",
            width: "100%",
            top: 0
          },
          img: { visibility: "hidden" },
          dummy: { display: "block" }
        }
      : { search: { position: "absolute" }, header: { position: "fixed" } };

    return (
      <>
        <div
          className="bigHeader"
          ref={bigH => {
            this.bigH = bigH;
          }}
        >
          <header className="banner" style={style.banner}>
            <h1>NEW YORK CITY TREES</h1>
            <p>
              <i>mapping the trees of NYC</i>
            </p>
            <img
              src="https://res.cloudinary.com/dw5c4jnc3/image/upload/v1547829310/nyc.png"
              alt="nyc trees"
            />
          </header>
          {/* <img
            
            src="/assets/west_village.jpg"
            alt="nyc trees"
           
          /> */}
        </div>
        {/* <div>Hi there</div> */}
        <div
          className="search"
          id="search"    
          ref={divElement => {
            this.divElement = divElement;
          }}
          // style={{ position: "sticky", top: "0", marginTop: "0", transform:"translateY(0%)"}}
        >
          {/* <h2>My Header</h2> */}
          {/* <img src = {process.env.PUBLIC_URL + "assets/west_village.jpg"}/> */}
          <img
            style={style.img}
            src="https://res.cloudinary.com/dw5c4jnc3/image/upload/v1547829310/nyc.png"
            alt="nyc trees"
          />

          <Search1
            style={style.searchInput}
            onchange={this.props.onchange}
            fixHeader={this.state.fixHeader}
            searchHeight={this.state.searchHeight}
            bigHeaderHeight={this.state.bigHeaderHeight}
            search={this.state.search}
          />
        </div>
        <div
          className="dummy"
          style={{ height: this.state.searchHeight }}
        ></div>
      </>
    );
  }
}

export default header;
