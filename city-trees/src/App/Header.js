import React, { Component } from "react";
import ReactDOM from "react-dom";

class header extends Component {
  state = {
    fixHeader: false
  };
  componentDidMount() {
    // this.fetchData(TREES_URL);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    // let headerHeight = document.getElementById("myHeader").offsetHeight
    const header = ReactDOM.findDOMNode(this);
    const search = ReactDOM.findDOMNode(this).getElementsByClassName('search')
    console.log("headerHeight", header.offsetHeight);
    // console.log('header', headerHeight)
    console.log("searchOffsetTop", search[0].offsetTop);

    console.log("windowScrollY", window.scrollY);

    if (window.scrollY < .6 * header.offsetHeight) {
      console.log("less than");
      this.setState({
        fixHeader: false
      });
    }
    if (window.scrollY > .6 * header.offsetHeight ) {
      this.setState({
        fixHeader: true
      });
    }
  };
  render() {
    console.log(this.state.fixHeader);
    const style = this.state.fixHeader
      ? 
      {
        searchInput:{
          // transform:'translateY(-150%)'
        },
        search:{
          position: "fixed",
          top: 0,
          width:'100%',
          height:'15%'
          // animation: 'fadeInSearch 1s', 
          // justifyContent: 'flex-end'
        },
        banner:{
          position: "fixed",  width:"100%", top:0
        },
        img:{visibility:'hidden'}
      }
      : 
      {search:{ position: "absolute" },
      header:{ position: "fixed" }}
    

    return (
      <div className="bigHeader" style={style.bigHeader}>
        <div className="search" id="search" style={style.search}>
          {/* <h2>My Header</h2> */}
          {/* <img src = {process.env.PUBLIC_URL + "assets/west_village.jpg"}/> */}
          <img style={style.img}
            src="https://res.cloudinary.com/dw5c4jnc3/image/upload/v1547829310/nyc.png"
            alt="nyc trees"
          />
          <input type="text" className="search-input" style={style.searchInput} placeholder="street, species, zipcode, health, etc..." />
        
        </div>
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
      </div>
    );
  }
}

export default header;
