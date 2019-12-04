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
    // window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  // handleScroll = () => {
  //   // let headerHeight = document.getElementById("myHeader").offsetHeight
  //   const header = ReactDOM.findDOMNode(this);
  //   const search = ReactDOM.findDOMNode(this).getElementsByClassName("search");
  //   // console.log("headerHeight", header.offsetHeight);
  //   // console.log('header', headerHeight)
  //   // console.log("searchOffsetTop", search[0].offsetTop);

  //   // console.log("windowScrollY", window.scrollY);

  //   if (window.scrollY < 0.6 * header.offsetHeight) {
  //     // console.log("less than");
  //     this.setState({
  //       fixHeader: false
  //     });
  //   }
  //   if (window.scrollY > 0.6 * header.offsetHeight) {
  //     this.setState({
  //       fixHeader: true,
  //       input: ""
  //     });
  //   }
  // };

  render() {
    // const header = ReactDOM.findDOMNode(this);

    console.log(this.props);
    const style = this.props.fixHeader
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
          img: { visibility: "hidden" }
        }
      : { search: { position: "absolute" }, header: { position: "fixed" } };

    return (
      <>
      
        <div className="bigHeader" style={style.bigHeader}>
          
          {/* <header className="banner" style={style.banner}>
            <h1>NEW YORK CITY TREES</h1>
            <p>
              <i>mapping the trees of NYC</i>
            </p>
            <img
              src="https://res.cloudinary.com/dw5c4jnc3/image/upload/v1547829310/nyc.png"
              alt="nyc trees"
            />
          </header> */}
        </div>
        {/* <div>Hi there</div> */}
        <div
          className="search"
          id="search"
          style={{ position: "sticky", top: "20%", marginTop: "0", transform:"translateY(-100%)"}}
        >
          {/* <h2>My Header</h2> */}
          {/* <img src = {process.env.PUBLIC_URL + "assets/west_village.jpg"}/> */}
          <img
            style={style.img}
            src="https://res.cloudinary.com/dw5c4jnc3/image/upload/v1547829310/nyc.png"
            alt="nyc trees"
          />
          <Search1 style={style.searchInput} onchange={this.props.onchange()} />
        </div>
      </>
    );
  }
}

export default header;
