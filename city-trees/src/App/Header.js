import React, { Component } from "react";
import ReactDOM from "react-dom";
import Search1 from "./Search1";
// import axios from "axios";

class header extends Component {
  state = {
    fixHeader: false
  };
  componentDidMount() {
    // this.fetchData(TREES_URL);
    window.addEventListener("scroll", this.handleScroll);
    // console.log('here')
    const headerCDM = ReactDOM.findDOMNode(this)
    // console.log('headerCDM', headerCDM.offsetHeight)
    const bigHeaderHeight = this.bigH.offsetHeight;
    const bannerHeight = this.banner.offsetHeight;
    const searchHeight = this.searchDiv.offsetHeight;
    // console.log(searchHeight, bigHeaderHeight);
    this.setState({
      bigHeaderHeight: bigHeaderHeight,
      searchHeight: searchHeight,
      bannerHeight:bannerHeight
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    // console.log("window scroll", window.scrollY);
    // const searchHeight = this.searchDiv.offsetHeight;
    // this.setState({
    //   dummyHeight: searchHeight,

    //   // search:search
    // });
    // let headerHeight = document.getElementById("myHeader").offsetHeighthere
    const header = ReactDOM.findDOMNode(this);
    // console.log(header.offsetHeight)
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
      // console.log("more than")
      this.setState({
        fixHeader: true,
        input: ""
      });
    }
  };

  scrollToView = () => {
    
    console.log('scroll to', this.props.searchHeight + this.props.bigHeaderHeight)
    
    // console.log(this.props.fixHeader)
    window.scrollTo(0, this.state.bigHeaderHeight + this.state.searchHeight) 
    // this.props.search.scrollIntoView()
  }

  render() {
    // console.log(this.props);
    // const header = ReactDOM.findDOMNode(this);

    // console.log(this.props);
    const style = this.state.fixHeader
      ? {
          img: { visibility: "hidden" },
          dummy: { display: "block", height: this.state.searchHeight + this.state.bannerHeight}
        }
      : {
          dummy: { height: 0 }
        };
    return (
      <>
        <div
          className="bigHeader"
          ref={bigH => {
            this.bigH = bigH;
          }}
        >
          <header
            className="banner"
            ref={banner => {
              this.banner = banner;
            }}
          >
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
          ref={searchDiv => {
            this.searchDiv = searchDiv;
          }}
          style={{ top: this.state.bannerHeight}}
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
            getData={this.props.getData}
            getSearch={this.props.getSearch}
            initSrchVal={this.props.initSrchVal}
            onsubmit={this.props.onsubmit}
            fixHeader={this.state.fixHeader}
            searchHeight={this.state.searchHeight}
            bigHeaderHeight={this.state.bigHeaderHeight}
            bannerHeight={this.state.bannerHeight}
            // search={this.state.search}
            // searchString={this.props.searchString}
            scrollToView={this.scrollToView}
            // filtered={this.props.filtered}
            // searchClick={this.props.searchClick}
          />
        
        </div>
        <div className="dummy" style={style.dummy}></div>
      </>
    );
  }
}

export default header;
